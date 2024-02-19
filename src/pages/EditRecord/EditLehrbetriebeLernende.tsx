'use client';

import { useParams } from 'react-router-dom';
import './EditRecord.css';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteSingle,
  getLehrbetriebe,
  getLernende,
  getSingle,
  updateLehrbetriebeLernende,
} from '@/lib/querys';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { lehrbetriebeLernendeFormSchema as formSchema } from '@/lib/schemas';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Row_lehrbetrieb_lernende } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { router } from '@/router';
import LoadingIcons from 'react-loading-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function EditLehrbetriebeLernende() {
  const tableName: string = 'lehrbetriebe_lernende';

  const queryClient = useQueryClient();

  const { id } = useParams();
  if (!id) toast('Ungültige ID');

  const { data, isPending } = useQuery({
    queryKey: ['lehrbetriebe_lernende'],
    queryFn: () =>
      getSingle({
        tableName: 'lehrbetriebe_lernende',
        id: id ?? '',
      }),
  });
  let { data: lehrbetriebData } = useQuery({
    queryKey: ['lehrbetriebe'],
    queryFn: getLehrbetriebe,
  });
  let { data: lernendeData } = useQuery({
    queryKey: ['lernende'],
    queryFn: getLernende,
  });
  const rowData = data as Row_lehrbetrieb_lernende | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nr_lehrbetrieb: rowData?.nr_lehrbetrieb ?? '',
      nr_lernende: rowData?.nr_lernende ?? '',
      start: rowData?.start ?? '',
      ende: rowData?.ende ?? '',
      beruf: rowData?.beruf ?? '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateLehrbetriebeLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lehrbetriebe'],
      });
      router.navigate(`/${tableName}/${id}`);
    },
  });
  const deleteEntry = useMutation({
    mutationFn: () => deleteSingle({ tableName: tableName, id: id ?? '0' }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lehrbetriebe', 'lernende'],
      });
      router.navigate(`/${tableName}`);
    },
  });
  if (!lehrbetriebData || !JSON.stringify(lehrbetriebData).startsWith('['))
    lehrbetriebData = [
      {
        id: '0',
        firma: 'Lädt...',
        strasse: '',
        plz: '',
        ort: '',
      },
    ];
  if (!lernendeData || !JSON.stringify(lernendeData).startsWith('['))
    lernendeData = [
      {
        id: '0',
        vorname: 'Lädt...',
        nachname: 'Lädt...',
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
    <div className="edit-record">
      {isPending ? (
        <LoadingIcons.TailSpin fill="black" />
      ) : (
        <Form {...form} control={form.control}>
          <FormLabel className="mb-5">
            Verbindung von Lehrbetrieb zu Lernender bearbeiten
          </FormLabel>
          <div className="mt-4 border-t border-black"></div>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({ data: form.getValues(), id: id ?? '0' });
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
            <FormField
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={rowData?.start || 'Start'}
                      className="bg-white"
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
                <FormItem>
                  <FormLabel>Ende</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={rowData?.ende || 'Ende'}
                      className="bg-white"
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
                <FormItem>
                  <FormLabel>Beruf</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Beruf"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 mt-4">
              <Button
                type="button"
                onClick={() => deleteEntry.mutate()}
                className="bg-red-500 mr-1"
              >
                Löschen
              </Button>
              <Button type="submit" className="ml-1">
                Speichern
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default EditLehrbetriebeLernende;
