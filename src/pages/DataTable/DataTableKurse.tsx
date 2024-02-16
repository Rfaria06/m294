import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getKurse } from '@/lib/querys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import './DataTable.css';
import { router } from '@/router';

function DataTableKurse() {
  const TABLE_NAME = 'kurse';
  useQueryClient();
  // eslint-disable-next-line prefer-const
  let { data, isPending, refetch } = useQuery({
    queryKey: ['kurse'],
    queryFn: getKurse,
    initialData: [],
  });
  if (!JSON.stringify(data || {}).startsWith('[') || data === undefined) {
    refetch();
    data = [
      {
        id: '1',
        kursnummer: '',
        kursthema: '',
        inhalt: '',
        nr_dozent: '',
        startdatum: '',
        enddatum: '',
        dauer: '',
      },
    ];
  }
  return (
    <div>
      <div className="mb-3">
        <NavLink to={`/${TABLE_NAME}/create`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Neu</TooltipTrigger>
              <TooltipContent>
                <p>Einen neuen Dozent erstellen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
      <div className="table">
        <h1>Kurse</h1>
        <Table>
          <TableHeader>
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="text-black">Kursnummer</TableHead>
            <TableHead className="text-black">Kursthema</TableHead>
            <TableHead className="text-black">Inhalt</TableHead>
            <TableHead className="text-black">Nr. Dozent</TableHead>
            <TableHead className="text-black">Startdatum</TableHead>
            <TableHead className="text-black">Enddatum</TableHead>
            <TableHead className="text-black">Dauer</TableHead>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 8 }).map((_, colIndex) => (
                      <TableCell className="text-left" key={colIndex}>
                        <Skeleton className="w-full h-[25px] mb-2" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() =>
                      router.navigate({
                        pathname: `/${TABLE_NAME}/${row.id}`,
                      })
                    }
                    className="cursor-pointer"
                  >
                    <TableCell className="text-left">{row.id}</TableCell>
                    <TableCell className="text-left">
                      {row.kursnummer}
                    </TableCell>
                    <TableCell className="text-left">{row.kursthema}</TableCell>
                    <TableCell className="text-left">{row.inhalt}</TableCell>
                    <TableCell className="text-left">{row.nr_dozent}</TableCell>
                    <TableCell className="text-left">
                      {row.startdatum}
                    </TableCell>
                    <TableCell className="text-left">{row.enddatum}</TableCell>
                    <TableCell className="text-left">{row.dauer}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableKurse;
