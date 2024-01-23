"use client";

import { useForm } from "react-hook-form";
import "./CreateRecord.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(3, {
    // EXAMPLE
    message: "Username must be at least 3 characters long.",
  }),
  vorname: z.string().min(1, {
    message: "Vorname muss mindestens 1 Zeichen lang sein.",
  }),
  nachname: z.string().min(1, {
    message: "Nachname muss mindestens 1 Zeichen lang sein.",
  }),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

function CreateDozent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default CreateDozent;
