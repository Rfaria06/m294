import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { postLernende } from '@/lib/querys';
import { lernendeFormSchema as formSchema } from '@/lib/schemas';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CountryPopover from '@/lib/popovers/CountryPopover';
import GenderPopover from '@/lib/popovers/GenderPopover';

function CreateLernende() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lernende'],
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Lernender</FormLabel>
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
                    placeholder="Vorname"
                    className="bg-white w-[250px]"
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
                    placeholder="Nachname"
                    className="bg-white w-[250px]"
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
                    placeholder="Strasse"
                    className="bg-white w-[250px]"
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
                    placeholder="PLZ"
                    className="bg-white w-[250px]"
                    {...field}
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
                  <Input
                    placeholder="Ort"
                    className="bg-white w-[250px]"
                    {...field}
                  />
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
                    placeholder="Telefon"
                    className="bg-white w-[250px]"
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
                  <Input
                    placeholder="Handy"
                    className="bg-white w-[250px]"
                    {...field}
                  />
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
                  <Input
                    placeholder="E-Mail"
                    className="bg-white w-[250px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email_privat"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input
                    placeholder="E-Mail privat"
                    className="bg-white w-[250px]"
                    {...field}
                  />
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
                  <Input
                    className="bg-white w-[250px]"
                    placeholder="Geburtsdatum"
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

export default CreateLernende;
