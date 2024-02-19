import {
  getLehrbetriebe,
  getLernende,
  postLehrbetriebeLernende,
} from '@/lib/querys';
import {
  QueryClient,
  useMutation,
  useQuery,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  let { data: lehrbetriebData } = useQuery({
    queryKey: ['lehrbetriebe'],
    queryFn: getLehrbetriebe,
  });
  let { data: lernendeData } = useQuery({
    queryKey: ['lernende'],
    queryFn: getLernende,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (!lehrbetriebData)
    lehrbetriebData = [
      {
        id: '0',
        firma: '',
        strasse: '',
        plz: '',
        ort: '',
      },
    ];
  if (!lernendeData)
    lernendeData = [
      {
        id: '0',
        vorname: '',
        nachname: '',
        strasse: '',
        plz: '',
        ort: '',
        nr_land: '',
        geschlecht: 'm',
        telefon: '',
        handy: '',
        email: '',
        email_privat: '',
        birthdate: '',
      },
    ];
  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">
          Neue Verbindung von Lehrbetrieb zu Lernender
        </FormLabel>
        <div className="w-full border-t border-black mt-4"></div>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="nr_lehrbetrieb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lehrbetrieb*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Lehrbetrieb..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lehrbetriebData?.map((lehrbetrieb) => (
                      <SelectItem key={lehrbetrieb.id} value={lehrbetrieb.id}>
                        {lehrbetrieb.firma}
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
            name="nr_lernende"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lernende/r*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Lernende/r..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lernendeData?.map((lernender) => (
                      <SelectItem key={lernender.id} value={lernender.id}>
                        {lernender.vorname} {lernender.nachname}
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
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <Input placeholder="Start" className="bg-white " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="ende"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ende</FormLabel>
                <FormControl>
                  <Input placeholder="Ende" className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="beruf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beruf</FormLabel>
                <FormControl>
                  <Input placeholder="Beruf" className="bg-white" {...field} />
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

export default CreateLehrbetriebeLernende;
