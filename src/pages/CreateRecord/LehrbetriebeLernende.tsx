import { postLehrbetriebeLernende } from '@/lib/querys';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { lehrbetriebeLernendeFormSchema as formSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import LehrbetriebePopover from '@/lib/popovers/LehrbetriebePopover';
import LernendePopover from '@/lib/popovers/LernendePopover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function CreateLehrbetriebeLernende() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLehrbetriebeLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lehrbetriebeLernende'],
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">
          Neue Verbindung von Lehrbetrieb zu Lernender
        </FormLabel>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="nr_lehrbetrieb"
            render={({ field }) => (
              <FormItem className="mb-4 flex justify-center">
                <FormControl>
                  <LehrbetriebePopover field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="nr_lernende"
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
            name="start"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input
                    placeholder="Start"
                    className="bg-white w-[250px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ende"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input
                    placeholder="Ende"
                    className="bg-white w-[250px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="beruf"
            render={({ field }) => (
              <FormItem className="mb-4 flex justify-center">
                <FormControl>
                  <Input
                    placeholder="Beruf"
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

export default CreateLehrbetriebeLernende;
