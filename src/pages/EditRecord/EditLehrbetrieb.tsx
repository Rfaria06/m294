"use client";

import { useParams } from "react-router-dom";
import "./EditRecord.css";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSingle, getSingle, updateLehrbetriebe } from "@/lib/querys";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { lehrbetriebeFormSchema as formSchema } from "@/lib/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Row_lehrbetriebe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { router } from "@/router";

function EditLehrbetrieb() {
  const tableName: string = "lehrbetriebe";

  const queryClient = useQueryClient();

  const { id } = useParams();
  if (!id) toast("Ungültige ID");

  const { data } = useQuery({
    queryKey: ["lehrbetriebe"],
    queryFn: () =>
      getSingle({
        tableName: "lehrbetriebe",
        id: id ?? "",
      }),
  });
  const rowData = data as Row_lehrbetriebe | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firma: rowData?.firma ?? "",
      strasse: rowData?.strasse ?? "",
      plz: rowData?.plz ?? "",
      ort: rowData?.ort ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateLehrbetriebe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lehrbetriebe"],
      });
      router.navigate(`/${tableName}/${id}`);
    },
  });
  const deleteEntry = useMutation({
    mutationFn: () => deleteSingle({ tableName: tableName, id: id ?? "0" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lehrbetriebe"],
      });
      router.navigate(`/${tableName}`);
    },
  });
  return (
    <div className="edit-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Lehrbetrieb bearbeiten</FormLabel>
        <div className="mt-4 border-t border-black"></div>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues(), id: id ?? "0" });
          })}
        >
          <FormField
            name="firma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firma</FormLabel>
                <FormControl>
                  <Input
                    placeholder={rowData?.firma || "Firma"}
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="strasse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strasse</FormLabel>
                <FormControl>
                  <Input
                    placeholder={rowData?.strasse || "Strasse"}
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="plz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PLZ</FormLabel>
                <FormControl>
                  <Input
                    placeholder={rowData?.plz || "PLZ"}
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ort</FormLabel>
                <FormControl>
                  <Input
                    placeholder={rowData?.ort || "Ort"}
                    className="bg-white"
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
    </div>
  );
}

export default EditLehrbetrieb;
