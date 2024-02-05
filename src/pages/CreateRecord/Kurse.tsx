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
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/lib/CustomComponents/DatePicker";
import DozentenPopover from "@/lib/popovers/DozentenPopover";
import { postKurs } from "@/lib/querys";
import { kursFormSchema as formSchema } from "@/lib/schemas/";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "./CreateRecord.css";

function CreateKurs() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postKurs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kurse"] });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Kurs</FormLabel>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="kursnummer"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Kursnummer"
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
              <FormItem className="mb-4">
                <FormControl>
                  <Textarea
                    className="bg-white"
                    placeholder="Kursthema"
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
              <FormItem className="mb-4">
                <FormControl>
                  <Textarea
                    className="bg-white"
                    placeholder="Inhalt"
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
              <FormItem className="mb-4">
                <FormControl>
                  <DozentenPopover field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="startdatum"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <DatePicker field={field} title="Startdatum" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="enddatum"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <DatePicker field={field} title="Enddatum" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="dauer"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input className="bg-white" placeholder="Dauer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Erstellen</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateKurs;
