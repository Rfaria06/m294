import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteSingle, getSingle, updateLaender } from "@/lib/querys";
import { Row_laender } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { laenderFormSchema as formSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingIcons from "react-loading-icons";
import { router } from "@/router";
import * as z from "zod";
import "./EditRecord.css";

function EditLand() {
  const tableName: string = "laender";
  const queryClient = useQueryClient();
  const { id } = useParams();
  if (!id) toast("Ungültige ID");

  const { data, isPending } = useQuery({
    queryKey: ["laender"],
    queryFn: () => getSingle({ tableName: tableName, id: id ?? "0" }),
    initialData: [],
  });
  const rowData = data as Row_laender | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: rowData?.country || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateLaender,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["laender"],
      });
      router.navigate(`/${tableName}/${id}`);
    },
  });
  const deleteEntry = useMutation({
    mutationFn: () => deleteSingle({ tableName: tableName, id: id ?? "0" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["laender"],
      });
      router.navigate(`/${tableName}`);
    },
  });

  return (
    <div className="edit-record">
      {isPending ? (
        <LoadingIcons.TailSpin fill="black" />
      ) : (
        <Form {...form} control={form.control}>
          <FormLabel className="mb-5 font-bold">Land bearbeiten</FormLabel>
          <div className="w-full border-t border-black mt-4"></div>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({ data: form.getValues(), id: id || "0" });
            })}
          >
            <FormField
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Land*</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.country || "Land*"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 mt-4">
              <Button
                type="button"
                onClick={() => deleteEntry.mutate()}
                className="bg-red-500 mr-1"
              >
                Löschen
              </Button>
              <Button type="submit" className="ml-1">
                Speichern
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default EditLand;
