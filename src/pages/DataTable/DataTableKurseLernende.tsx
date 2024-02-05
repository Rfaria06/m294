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
import { getKurseLernende } from '@/lib/querys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import './DataTable.css';
import { router } from '@/router';

function DataTableKurseLernende() {
  const TABLE_NAME = 'kurse_lernende';
  useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['kurseLernende'],
    queryFn: getKurseLernende,
  });

  return (
    <div>
      <div className='mb-3'>
        <NavLink to={`/${TABLE_NAME}/create`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Neu</TooltipTrigger>
              <TooltipContent>
                <p>Eine neue Verbindung Kurse ➞ Lernende erstellen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
      <div className='table'>
        <h1>Kurse ➞ Lernende</h1>
        <Table>
          <TableHeader>
            <TableHead className='text-black'>ID</TableHead>
            <TableHead className='text-black'>Nr. Teilnehmer</TableHead>
            <TableHead className='text-black'>Nr. Kurs</TableHead>
            <TableHead className='text-black'>Note</TableHead>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 8 }).map((_, colIndex) => (
                      <TableCell className='text-left' key={colIndex}>
                        <Skeleton className='w-full h-[25px] mb-2' />
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
                    className='cursor-pointer'
                  >
                    <TableCell className='text-left'>{row.id}</TableCell>
                    <TableCell className='text-left'>
                      {row.nr_teilnehmer}
                    </TableCell>
                    <TableCell className='text-left'>{row.nr_kurs}</TableCell>
                    <TableCell className='text-left'>{row.note}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableKurseLernende;
