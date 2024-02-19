"use client";

import { postLaender } from "@/lib/querys";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { laenderFormSchema as formSchema } from "@/lib/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { router } from "@/router";

function CreateLand() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLaender,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["laender"],
      });
      router.navigate("/laender");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5 font-bold">Neues Land</FormLabel>
        <div className="mb-1 border-t border-black"></div>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land*</FormLabel>
                <FormControl>
                  <Input placeholder="Land*" className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
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

export default CreateLand;
