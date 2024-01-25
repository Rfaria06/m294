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
                <FormControl></FormControl>
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
