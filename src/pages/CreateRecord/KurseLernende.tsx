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
import KursePopover from "@/lib/popovers/KursePopover";
import LernendePopover from "@/lib/popovers/LernendePopover";
import { postKurseLernende } from "@/lib/querys";
import { kurseLernendeFormSchema as formSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

function CreateKurseLernende() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postKurseLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kurseLernende"] });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">
          Neue Verbindung von Kurs zu Lernender
        </FormLabel>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="nr_teilnehmer"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <LernendePopover field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="nr_kurs"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <KursePopover field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="note"
            render={({ field }) => (
              <FormItem className="mb-4 flex justify-center">
                <FormControl>
                  <Input
                    placeholder="Note"
                    className="bg-white w-[250px]"
                    {...field}
                  />
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

export default CreateKurseLernende;
