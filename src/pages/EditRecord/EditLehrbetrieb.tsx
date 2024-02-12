import { useParams } from 'react-router-dom';
import './EditRecord.css';
import { toast } from 'sonner';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSingle } from '@/lib/querys';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { lehrbetriebeFormSchema as formSchema } from '@/lib/schemas';}
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

function EditLehrbetrieb() {
	const queryClient: QueryClient = useQueryClient();

	const { id } = useParams() ?? '';
	if (!id) toast('Ungültige ID');

	const { data, isFetching } = useQuery({
		queryKey: ['lehrbetriebe'],
		queryFn: () =>
			getSingle({
				tableName: 'lehrbetriebe',
				id: id ?? '',
			}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})

	const mutation = useMutation({
		mutationFn: 
	})

	return (
		<div className="create-record">
			<Form {...form} control={form.control}>
				<FormLabel className="mb-5">Neuer Lehrbetrieb</FormLabel>
				<form
					onSubmit={form.handleSubmit(() => {
						mutation.mutate({ data: form.getValues() });
					})}
				>
					<FormField
						name="firma"
						render={({ field }) => (
							<FormItem className="mb-4 flex justify-center">
								<FormControl>
									<Input
										placeholder="Firma"
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
							<FormItem className="mb-4 flex justify-center">
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
							<FormItem className="mb-4 flex justify-center">
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
							<FormItem className="mb-4 flex justify-center">
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
					<Button type="submit">Erstellen</Button>
				</form>
			</Form>
		</div>
	);
}

export default EditLehrbetrieb;
