'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getKurse, getLernende, postKurseLernende } from '@/lib/querys';
import { kurseLernendeFormSchema as formSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

function CreateKurseLernende() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postKurseLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kurseLernende'] });
    },
  });
  let { data: kurseData } = useQuery({
    queryKey: ['kurse'],
    queryFn: getKurse,
  });
  let { data: lernendeData } = useQuery({
    queryKey: ['lernende'],
    queryFn: getLernende,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (!kurseData)
    kurseData = [
      {
        id: '0',
        kursnummer: '',
        kursthema: '',
        inhalt: '',
        nr_dozent: '',
        startdatum: '',
        enddatum: '',
        dauer: '',
      },
    ];
  if (!lernendeData)
    lernendeData = [
      {
        id: '0',
        vorname: '',
        nachname: '',
        email: '',
        email_privat: '',
        telefon: '',
        handy: '',
        strasse: '',
        plz: '',
        ort: '',
        birthdate: '',
        nr_land: '',
        geschlecht: 'm',
      },
    ];
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
              <FormItem>
                <FormLabel>Teilnehmer*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Teilnehmer..." />
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
          <FormField
            name="nr_kurs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kurs*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kurs..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kurseData?.map((kurs) => (
                      <SelectItem key={kurs.id} value={kurs.id}>
                        {kurs.kursnummer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
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
          <Button type="submit" className="mt-4">
            Erstellen
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateKurseLernende;
