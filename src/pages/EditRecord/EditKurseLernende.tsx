import "./EditRecord.css";
import * as z from "zod";
import { router } from "@/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteSingle,
  getKurse,
  getLernende,
  getSingle,
  updateKurseLernende,
} from "@/lib/querys";
import { kurseLernendeFormSchema as formSchema } from "@/lib/schemas";
import { Row_kurse_lernende } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingIcons from "react-loading-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

function EditKurseLernende() {
  const tableName: string = "kurse_lernende";
  const queryClient = useQueryClient();

  const { id } = useParams();
  if (!id) toast("Ungültige ID");

  const { data, isPending } = useQuery({
    queryKey: ["kurse_lernende"],
    queryFn: () => getSingle({ tableName: tableName, id: id ?? "0" }),
  });
  let { data: kurseData } = useQuery({
    queryKey: ["kurse"],
    queryFn: getKurse,
  });
  let { data: lernendeData } = useQuery({
    queryKey: ["lernende"],
    queryFn: getLernende,
  });

  const rowData = data as Row_kurse_lernende | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nr_teilnehmer: rowData?.nr_teilnehmer || "",
      nr_kurs: rowData?.nr_kurs || "",
      note: rowData?.note || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateKurseLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kurse_lernende"],
      });
      router.navigate(`/${tableName}/${id}`);
    },
  });
  const deleteEntry = useMutation({
    mutationFn: () => deleteSingle({ tableName: tableName, id: id ?? "0" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kurse_lernende"],
      });
      router.navigate(`/${tableName}`);
    },
  });

  if (!kurseData)
    kurseData = [
      {
        id: "0",
        kursnummer: "",
        kursthema: "",
        inhalt: "",
        nr_dozent: "",
        startdatum: "",
        enddatum: "",
        dauer: "",
      },
    ];
  if (!lernendeData)
    lernendeData = [
      {
        id: "0",
        vorname: "",
        nachname: "",
        email: "",
        email_privat: "",
        telefon: "",
        handy: "",
        strasse: "",
        plz: "",
        ort: "",
        birthdate: "",
        nr_land: "",
        geschlecht: "m",
      },
    ];

  return (
    <div className="edit-record">
      {isPending ? (
        <LoadingIcons.TailSpin fill="black" />
      ) : (
        <Form {...form} control={form.control}>
          <FormLabel className="mb-5">Kurse ➞ Lernende bearbeiten</FormLabel>
          <div className="w-full border-t border-black mt-4"></div>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({
                data: form.getValues(),
                id: id ?? "0",
              });
            })}
          >
            <FormField
              name="nr_teilnehmer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teilnehmer*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Teilnehmer..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lernendeData?.map((lernender) => (
                        <SelectItem key={lernender.id} value={lernender.id}>
                          {lernender.vorname} {lernender.nachname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nr_kurs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kurs*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Kurs..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kurseData?.map((kurs) => (
                        <SelectItem key={kurs.id} value={kurs.id}>
                          {kurs.kursnummer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.note || "Note"}
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

export default EditKurseLernende;
