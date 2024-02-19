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
import {
  deleteSingle,
  getLaender,
  getSingle,
  updateLernende,
} from "@/lib/querys";
import { Row_lernende } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { lernendeFormSchema as formSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingIcons from "react-loading-icons";
import { router } from "@/router";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./EditRecord.css";

function EditLernende() {
  const tableName: string = "lernende";
  const queryClient = useQueryClient();
  const { id } = useParams();
  if (!id) toast("Ungültige ID");

  const { data, isPending } = useQuery({
    queryKey: ["lernende"],
    queryFn: () => getSingle({ tableName: tableName, id: id ?? "0" }),
    initialData: [],
  });
  let { data: landData } = useQuery({
    queryKey: ["laender"],
    queryFn: getLaender,
    initialData: [],
  });
  const rowData = data as Row_lernende | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vorname: rowData?.vorname || "",
      nachname: rowData?.nachname || "",
      strasse: rowData?.strasse || "",
      plz: rowData?.plz || "",
      ort: rowData?.ort || "",
      nr_land: rowData?.nr_land || "",
      geschlecht: (rowData?.geschlecht as "m" | "w" | "d") || "d",
      email: rowData?.email || "",
      email_privat: rowData?.email_privat || "",
      telefon: rowData?.telefon || "",
      handy: rowData?.handy || "",
      birthdate: rowData?.birthdate || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lernende"],
      });
      router.navigate(`/${tableName}/${id}`);
    },
  });
  const deleteEntry = useMutation({
    mutationFn: () => deleteSingle({ tableName: tableName, id: id ?? "0" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lernende"],
      });
      router.navigate(`/${tableName}`);
    },
  });
  if (!landData) landData = [{ id: "0", country: "" }];

  return (
    <div className="edit-record">
      {isPending ? (
        <LoadingIcons.TailSpin fill="black" />
      ) : (
        <Form {...form} control={form.control}>
          <FormLabel className="mb-5 font-bold">
            Lernende/r bearbeiten
          </FormLabel>
          <div className="w-full border-t border-black mt-4"></div>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({ data: form.getValues(), id: id || "0" });
            })}
          >
            <FormField
              name="vorname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorname*</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.vorname || "Vorname"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nachname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachname*</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.nachname || "Nachname"}
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
                  <FormLabel>Strasse*</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.strasse || "Strasse"}
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
                      className="bg-white"
                      placeholder={rowData?.plz || "PLZ"}
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
                      className="bg-white"
                      placeholder={rowData?.ort || "Ort"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nr_land"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Land</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Land..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {landData?.map((land) => (
                        <SelectItem key={land.id} value={land.id}>
                          {land.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="geschlecht"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geschlecht</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Geschlecht..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m">Männlich</SelectItem>
                      <SelectItem value="w">Weiblich</SelectItem>
                      <SelectItem value="d">Divers</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="telefon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.telefon || "Telefon"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="handy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handy</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.handy || "Handy"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.email || "Email"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email_privat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Privat</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.email_privat || "Email Privat"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geburtsdatum</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.birthdate || "Geburtsdatum"}
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

export default EditLernende;
