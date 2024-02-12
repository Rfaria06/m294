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
import CountryPopover from '@/lib/popovers/CountryPopover';
import GenderPopover from '@/lib/popovers/GenderPopover';
import { getSingle, updateDozenten } from '@/lib/querys';
import { Row_dozenten } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { dozentFormSchema as formSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingIcons from 'react-loading-icons';
import { router } from '@/router';
import * as z from 'zod';

function EditDozent() {
  const tableName: string = 'dozenten';

  const queryClient = useQueryClient();

  const { id } = useParams();
  if (!id) toast('Ungültige ID');

  const { data, isPending } = useQuery({
    queryKey: ['dozenten'],
    queryFn: () =>
      getSingle({
        tableName: 'dozenten',
        id: id || '',
      }),
  });
  const rowData = data as Row_dozenten | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vorname: rowData?.vorname || '',
      nachname: rowData?.nachname || '',
      strasse: rowData?.strasse || '',
      plz: rowData?.plz || '',
      ort: rowData?.ort || '',
      nr_land: rowData?.nr_land || '',
      geschlecht: (rowData?.geschlecht as 'm' | 'w' | 'd') || 'd',
      telefon: rowData?.telefon || '',
      handy: rowData?.handy || '',
      email: rowData?.email || '',
      birthdate: rowData?.birthdate || '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateDozenten,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dozenten'],
      });
      router.navigate(`/${tableName}/${id}`);
    },
  });

  return (
    <div className="create-record">
      {isPending ? (
        <LoadingIcons.TailSpin fill="black" />
      ) : (
        <Form {...form} control={form.control}>
          <FormLabel className="mb-5">Dozent bearbeiten</FormLabel>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate({ data: form.getValues(), id: id || '0' });
            })}
          >
            <FormField
              name="vorname"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder={rowData?.vorname || 'Vorname*'}
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
                      className="bg-white"
                      placeholder={rowData?.nachname || 'Nachname*'}
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
                      className="bg-white"
                      placeholder={rowData?.strasse || 'Strasse*'}
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
                      className="bg-white"
                      placeholder={rowData?.plz || 'PLZ'}
                      {...field}
                      max={4}
                      min={4}
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
                      className="bg-white"
                      placeholder={rowData?.ort || 'Ort'}
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
                      className="bg-white"
                      placeholder={rowData?.telefon || 'Telefon'}
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
                      className="bg-white"
                      placeholder={rowData?.handy || 'Handy'}
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
                      className="bg-white"
                      placeholder={rowData?.email || 'Email'}
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
                      placeholder={rowData?.birthdate || 'Geburtsdatum'}
                      {...field}
                    />
                  </FormControl>
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

export default EditDozent;
