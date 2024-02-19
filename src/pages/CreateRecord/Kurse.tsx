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
import { Textarea } from '@/components/ui/textarea';
import { getDozenten, postKurs } from '@/lib/querys';
import { kursFormSchema as formSchema } from '@/lib/schemas/';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import './CreateRecord.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { router } from '@/router';

function CreateKurs() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postKurs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kurse'] });
      router.navigate('/kurse');
    },
  });
  let { data: dozentData } = useQuery({
    queryKey: ['dozenten'],
    queryFn: getDozenten,
    initialData: [],
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (!dozentData || !JSON.stringify(dozentData).startsWith('['))
    dozentData = [
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
        birthdate: '',
      },
    ];
  return (
    <div className="create-record">
      <Form {...form} control={form.control}>
        <FormLabel className="mb-5">Neuer Kurs</FormLabel>
        <div className="w-full border-t border-black mt-4"></div>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name="kursnummer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kursnummer*</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Kursnummer*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="kursthema"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kursthema</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-white"
                    placeholder="Kursthema"
                    maxLength={100}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="inhalt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inhalt</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-white"
                    placeholder="Inhalt"
                    maxLength={100}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="nr_dozent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dozent</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Dozent..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dozentData?.map((dozent) => (
                      <SelectItem key={dozent.id} value={dozent.id}>
                        {dozent.vorname + ' ' + dozent.nachname}
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
            name="startdatum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startdatum</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white w-[250px]"
                    placeholder="Startdatum"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="enddatum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enddatum</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white w-[250px]"
                    placeholder="Enddatum"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border-t border-grey mt-4"></div>
          <FormField
            name="dauer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dauer</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Dauer" {...field} />
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

export default CreateKurs;
