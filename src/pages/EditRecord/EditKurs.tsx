import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { deleteSingle, getDozenten, getSingle, updateKurs } from "@/lib/querys";
import { Row_kurse } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { kursFormSchema as formSchema } from "@/lib/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@/router";
import LoadingIcons from "react-loading-icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./EditRecord.css";

function EditKurs() {
  const tableName: string = "kurse";

  const queryClient = useQueryClient();

  const { id } = useParams();
  if (!id) toast("Ungültige ID");

  const { data, isPending } = useQuery({
    queryKey: ["kurse"],
    queryFn: () =>
      getSingle({
        tableName: "kurse",
        id: id || "",
      }),
  });
  let { data: dozentData } = useQuery({
    queryKey: ["dozenten"],
    queryFn: getDozenten,
    initialData: [],
  });
  const rowData = data as Row_kurse | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kursnummer: rowData?.kursnummer || "",
      kursthema: rowData?.kursthema || "",
      inhalt: rowData?.inhalt || "",
      nr_dozent: rowData?.nr_dozent || "",
      startdatum: rowData?.startdatum || "",
      enddatum: rowData?.enddatum || "",
      dauer: rowData?.dauer || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateKurs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kurse"],
      });
      router.navigate(`/${tableName}/${id}`);
    },
  });
  const deleteEntry = useMutation({
    mutationFn: () => deleteSingle({ tableName: tableName, id: id ?? "0" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kurse"],
      });
      router.navigate(`/${tableName}`);
    },
  });

  if (!dozentData)
    dozentData = [
      {
        id: "0",
        vorname: "",
        nachname: "",
        strasse: "",
        plz: "",
        ort: "",
        nr_land: "",
        geschlecht: "m",
        telefon: "",
        handy: "",
        email: "",
        birthdate: "",
      },
    ];
  return (
    <div className="edit-record">
      {isPending ? (
        <LoadingIcons.TailSpin fill="black" />
      ) : (
        <Form {...form} control={form.control}>
          <FormLabel className="mb-5 font-bold">Kurs bearbeiten</FormLabel>
          <div className="w-full border-t border-black mt-4"></div>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({ data: form.getValues(), id: id ?? "0" });
            })}
          >
            <FormField
              name="kursnummer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kursnummer*</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.kursnummer || "Kursnummer*"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="kursthema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kursthema</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-white"
                      placeholder={rowData?.kursthema || "Kursthema"}
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="inhalt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inhalt</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-white"
                      placeholder={rowData?.inhalt || "Inhalt"}
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nr_dozent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dozent</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Dozent..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dozentData?.map((dozent) => (
                        <SelectItem key={dozent.id} value={dozent.id}>
                          {dozent.vorname + " " + dozent.nachname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="startdatum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Startdatum</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.startdatum || "Startdatum"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="enddatum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enddatum</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.enddatum || "Enddatum"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="dauer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dauer</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.dauer || "Dauer"}
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

export default EditKurs;
