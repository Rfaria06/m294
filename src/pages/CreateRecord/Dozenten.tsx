"use client";

import { useForm } from "react-hook-form";
import "./CreateRecord.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { dozentFormSchema as formSchema } from "@/lib/schemas/";
import { Button } from "@/components/ui/button";
import CountryPopover from "../../lib/popovers/CountryPopover";
import GenderPopover from "@/lib/popovers/GenderPopover";
import DatePicker from "@/lib/CustomComponents/DatePicker.tsx";

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

function CreateDozent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div>
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Dozent</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="vorname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input placeholder="Vorname" {...field} />
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
                  <Input placeholder="Nachname" {...field} />
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
                  <Input placeholder="Strasse" {...field} />
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
                  <Input placeholder="PLZ" {...field} max={4} min={4} />
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
                  <Input placeholder="Ort" {...field} />
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
                  <Input placeholder="Telefon" {...field} />
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
                  <Input placeholder="Handy" {...field} />
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
                  <Input placeholder="E-Mail" {...field} />
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
