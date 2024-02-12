import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getSingle, updateKurs } from '@/lib/querys';
import { Row_kurse } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { kursFormSchema as formSchema } from '@/lib/schemas';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@/router';
import LoadingIcons from 'react-loading-icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DozentenPopover from '@/lib/popovers/DozentenPopover';

function EditKurs() {
  const tableName: string = 'kurse';

  const queryClient = useQueryClient();

  const { id } = useParams();
  if (!id) toast('Ungültige ID');

  const { data, isPending } = useQuery({
    queryKey: ['kurse'],
    queryFn: () =>
      getSingle({
        tableName: 'kurse',
        id: id || '',
      }),
  });
  const rowData = data as Row_kurse | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kursnummer: rowData?.kursnummer || '',
      kursthema: rowData?.kursthema || '',
      inhalt: rowData?.inhalt || '',
      nr_dozent: rowData?.nr_dozent || '',
      startdatum: rowData?.startdatum || '',
      enddatum: rowData?.enddatum || '',
      dauer: rowData?.dauer || '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateKurs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['kurse'],
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
          <FormLabel className="mb-5">Kurs bearbeiten</FormLabel>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({ data: form.getValues(), id: id ?? '0' });
            })}
          >
            <FormField
              name="kursnummer"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.kursnummer || 'Kursnummer'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="kursthema"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Textarea
                      className="bg-white"
                      placeholder={rowData?.kursthema || 'Kursthema'}
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="inhalt"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Textarea
                      className="bg-white"
                      placeholder={rowData?.inhalt || 'Inhalt'}
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nr_dozent"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <DozentenPopover field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="startdatum"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      className="bg-white w-[250px]"
                      placeholder={rowData?.startdatum || 'Startdatum'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="enddatum"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      className="bg-white w-[250px]"
                      placeholder={rowData?.enddatum || 'Enddatum'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="dauer"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.dauer || 'Dauer'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Speichern</Button>
          </form>
        </Form>
      )}
    </div>
  );
}

export default EditKurs;
