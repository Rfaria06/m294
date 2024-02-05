'use client';

import { postLaender } from '@/lib/querys';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { laenderFormSchema as formSchema } from '@/lib/schemas';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function CreateLand() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLaender,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['laender'],
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className='create-record'>
      <Form {...form} control={form.control}>
        <FormLabel className='mb-5'>Neues Land</FormLabel>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate({ data: form.getValues() });
          })}
        >
          <FormField
            name='country'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormControl>
                  <Input
                    placeholder='Land'
                    className='bg-white w-[250px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Erstellen</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateLand;
