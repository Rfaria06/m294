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
import DatePicker from "@/lib/CustomComponents/DatePicker.tsx";
import GenderPopover from "@/lib/popovers/GenderPopover";
import { postDozenten } from "@/lib/querys.ts";
import { dozentFormSchema as formSchema } from "@/lib/schemas/";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import CountryPopover from "../../lib/popovers/CountryPopover";
import "./CreateRecord.css";

function CreateDozent() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postDozenten,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dozenten"] });
      toast("Anfrage erfolgreich");
      redirect("/dozenten");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div>
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Dozent</FormLabel>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="vorname"
            render={({ field }) => (
              <FormItem className="mb-4">
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
          <FormField
            name="nachname"
            render={({ field }) => (
              <FormItem className="mb-4">
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
          <FormField
            name="strasse"
            render={({ field }) => (
              <FormItem className="mb-4">
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
          <FormField
            name="plz"
            render={({ field }) => (
              <FormItem className="mb-4">
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
          <FormField
            name="ort"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input className="bg-white" placeholder="Ort" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="nr_land"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <CountryPopover field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="geschlecht"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <GenderPopover field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="telefon"
            render={({ field }) => (
              <FormItem className="mb-4">
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
          <FormField
            name="handy"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input className="bg-white" placeholder="Handy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input className="bg-white" placeholder="E-Mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="birthdate"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Erstellen</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateDozent;
