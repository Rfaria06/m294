import { postLehrbetriebe } from "@/lib/querys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { lehrbetriebeFormSchema as formSchema } from "@/lib/schemas";
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

function CreateLehrbetrieb() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLehrbetriebe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lehrbetriebe"] });
      router.navigate("/lehrbetriebe");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Lehrbetrieb</FormLabel>
        <div className="w-full border-t border-black mt-4"></div>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="firma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firma*</FormLabel>
                <FormControl>
                  <Input placeholder="Firma" className="bg-white" {...field} />
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
                    placeholder="Strasse"
                    className="bg-white"
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
                  <Input placeholder="PLZ" className="bg-white" {...field} />
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
                  <Input placeholder="Ort" className="bg-white" {...field} />
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

export default CreateLehrbetrieb;
