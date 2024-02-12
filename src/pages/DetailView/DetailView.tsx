import { getSingle } from '@/lib/querys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import './DetailView.css';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Params = { tableName: string; id: string };

function DetailView() {
	useQueryClient();
	const { tableName, id } = useParams();
	let params: Params = { tableName: '', id: '' };
	let isForeignKey: boolean = false;
	let constraintTable: string = '';

	const title = (): string => {
		if (!tableName) return 'Details';
		let newName: string;
		newName = tableName;
		if (tableName === 'countries') newName = 'länder';
		return (
			newName.charAt(0)?.toUpperCase() + newName.slice(1).replace(/_/g, ' ➞ ')
		);
	};

	if (!tableName || !id) {
		toast('Ungültige URL');
	} else {
		params = { tableName, id };
	}

	const { data, isFetching } =
		useQuery({
			queryFn: () => getSingle(params),
			queryKey: [tableName],
		}) || {};

	const formatKey = (key: string): string => {
		if (key === 'id') return 'ID';
		if (key.startsWith('nr_')) {
			isForeignKey = true;
			constraintTable = key.slice(3);
			switch (constraintTable) {
				case 'land':
					constraintTable = 'laender';
					break;
				case 'lehrbetrieb':
					constraintTable = 'lehrbetriebe';
					break;
				case 'dozent':
					constraintTable = 'dozenten';
					break;
				case 'lernende':
				case 'teilnehmer':
					constraintTable = 'lernende';
					break;
				case 'kurs':
					constraintTable = 'kurse';
					break;
			}
		} else isForeignKey = false;
		return (
			key.charAt(0).toUpperCase() + // Capitalize the first letter
			key
				.slice(1) // Slice from the second character onwards
				.replace(/_/g, '. ') // Replace '_' with '. '
				.replace(/(\s\w)/g, function (match) {
					// Capitalize the letter after the space
					return match.toUpperCase();
				})
		);
	};

	const formatValue = (value: string): string => {
		switch (value) {
			case 'm':
				value = 'Männlich';
				break;
			case 'w':
				value = 'Weiblich';
				break;
			case 'd':
				value = 'Divers';
				break;
			case 'UNBEKANNT':
				value = '';
				break;
			case 'null':
				value = '';
				break;
		}
		return value;
	};

	return (
		<div className="container p-2">
			<div>
				<h1>{title()}</h1>
			</div>
			<Table className="text-left">
				<TableHeader>
					<TableRow>
						<TableHead>Schlüssel</TableHead>
						<TableHead>Wert</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isFetching ? (
						<TableRow>
							<TableCell colSpan={2}>Lade Daten...</TableCell>
						</TableRow>
					) : (
						Object.keys(data ?? {}).map((key) => (
							<TableRow key={key}>
								<TableCell>{formatKey(key)}</TableCell>
								{isForeignKey ? (
									<TableCell>
										<NavLink
											to={`/${constraintTable}/${
												data![key as keyof typeof data]
											}`}
										>
											{formatValue(data![key as keyof typeof data]) ?? ''}
										</NavLink>
									</TableCell>
								) : (
									<TableCell>
										{formatValue(data![key as keyof typeof data]) ?? ''}
									</TableCell>
								)}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export default DetailView;
