"use client";

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
import { getLaender, postDozenten } from "@/lib/querys.ts";
import { dozentFormSchema as formSchema } from "@/lib/schemas/";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "./CreateRecord.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { router } from "@/router";

function CreateDozent() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postDozenten,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dozenten"] });
      router.navigate("/dozenten");
    },
  });
  let { data: landData } = useQuery({
    queryKey: ["laender"],
    queryFn: getLaender,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (!landData) landData = [{ id: "0", country: "" }];
  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Dozent</FormLabel>
        <div className="mt-4 border-t border-black"></div>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
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
                    placeholder="Vorname*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="nachname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachname*</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Nachname*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="strasse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strasse</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Strasse"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="plz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PLZ</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="PLZ"
                    {...field}
                    max={4}
                    min={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="ort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ort</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Ort" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
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
          <div className="w-full border-t border-grey mt-4"></div>
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
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="telefon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Telefon"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="handy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handy</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Handy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="E-Mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geburtsdatum</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Geburtsdatum"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <Button type="submit" className="mt-4">
            Erstellen
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateDozent;
