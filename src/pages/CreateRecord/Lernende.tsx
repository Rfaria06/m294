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
import { getLaender, postLernende } from '@/lib/querys';
import { lernendeFormSchema as formSchema } from '@/lib/schemas';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { router } from '@/router';

function CreateLernende() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lernende'],
      });
      router.navigate('/lernende');
    },
  });
  let { data: landData } = useQuery({
    queryKey: ['laender'],
    queryFn: getLaender,
    initialData: [],
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (!landData) landData = [{ id: '0', country: '' }];
  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Lernender</FormLabel>
        <div className="w-full border-t border-black mt-4"></div>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="vorname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vorname*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vorname*"
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
            name="nachname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachname*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nachname*"
                    className="bg-white "
                    {...field}
                  />
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
                    className="bg-white "
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
                  <Input placeholder="PLZ" className="bg-white " {...field} />
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
                  <Input placeholder="Ort" className="bg-white " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="nr_land"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Land..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {landData?.map((land) => (
                      <SelectItem key={land.id} value={land.id}>
                        {land.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="geschlecht"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geschlecht</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Geschlecht..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m">Männlich</SelectItem>
                    <SelectItem value="w">Weiblich</SelectItem>
                    <SelectItem value="d">Divers</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="telefon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Telefon"
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
            name="handy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handy</FormLabel>
                <FormControl>
                  <Input placeholder="Handy" className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="E-Mail" className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="email_privat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Privat</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E-Mail privat"
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
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geburtsdatum</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Geburtsdatum"
                    {...field}
                  />
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

export default CreateLernende;
