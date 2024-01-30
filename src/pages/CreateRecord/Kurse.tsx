import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getDozenten, postKurs } from "@/lib/querys";
import { kursFormSchema as formSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

function CreateKurs() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postKurs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kurse"] });
    },
  });
  const query = useQuery({
    queryKey: ["kurse"],
    queryFn: getDozenten,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div>
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
        </form>
      </Form>
    </div>
  );
}

export default CreateKurs;
