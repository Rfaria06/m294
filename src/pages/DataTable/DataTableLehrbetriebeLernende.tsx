import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getLehrbetriebLernende } from '@/lib/querys';
import { NavLink } from 'react-router-dom';
import './DataTable.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { router } from '@/router';

function DataTableLehrbetriebeLernende() {
  const TABLE_NAME = 'lehrbetriebe_lernende';
  useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['lehrbetriebeLernende'],
    queryFn: getLehrbetriebLernende,
  });

  return (
    <div>
      <div className='mb-3'>
        <NavLink to={`/${TABLE_NAME}/create`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Neu</TooltipTrigger>
              <TooltipContent>
                <p>Eine neue Verbindung Lehrbetriebe ➞ Lernende erstellen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
      <div className='table'>
        <h1>Lehrbetriebe ➞ Lernende</h1>
        <Table>
          <TableHeader>
            <TableHead className='text-black'>ID</TableHead>
            <TableHead className='text-black'>Nr. Lehrbetrieb</TableHead>
            <TableHead className='text-black'>Nr. Lernende</TableHead>
            <TableHead className='text-black'>Start</TableHead>
            <TableHead className='text-black'>Ende</TableHead>
            <TableHead className='text-black'>Beruf</TableHead>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((_, colIndex) => (
                      <TableCell className='text-left' key={colIndex}>
                        <Skeleton className='w-full h-[25px] mb-2' />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((row) => (
                  <TableRow
                    key={row.id_lehrbetriebe_lernende}
                    onClick={() =>
                      router.navigate({
                        pathname: `/${TABLE_NAME}/${row.id_lehrbetriebe_lernende}`,
                      })
                    }
                    className='cursor-pointer'
                  >
                    <TableCell className='text-left'>
                      {row.id_lehrbetriebe_lernende ?? 'id'}
                    </TableCell>
                    <TableCell className='text-left'>
                      {row.nr_lehrbetrieb}
                    </TableCell>
                    <TableCell className='text-left'>
                      {row.nr_lernende}
                    </TableCell>
                    <TableCell className='text-left'>{row.start}</TableCell>
                    <TableCell className='text-left'>{row.ende}</TableCell>
                    <TableCell className='text-left'>{row.beruf}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableLehrbetriebeLernende;
