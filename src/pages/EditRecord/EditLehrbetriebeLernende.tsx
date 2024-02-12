'use client';

import { useParams } from 'react-router-dom';
import './EditRecord.css';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSingle, updateLehrbetriebeLernende } from '@/lib/querys';
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
import LehrbetriebePopover from '@/lib/popovers/LehrbetriebePopover';
import LernendePopover from '@/lib/popovers/LernendePopover';
import LoadingIcons from 'react-loading-icons';

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
  return (
    <div className="edit-record">
      {isPending ? (
        <LoadingIcons.TailSpin fill="black" />
      ) : (
        <Form {...form} control={form.control}>
          <FormLabel className="mb-5">
            Verbindung von Lehrbetrieb zu Lernender bearbeiten
          </FormLabel>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({ data: form.getValues(), id: id ?? '0' });
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
                <FormItem className="mb-4 flex justify-center">
                  <FormControl>
                    <Input
                      placeholder={rowData?.start || 'Start'}
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
                <FormItem className="mb-4 flex justify-center">
                  <FormControl>
                    <Input
                      placeholder={rowData?.ende || 'Ende'}
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
      )}
    </div>
  );
}

export default EditLehrbetriebeLernende;
