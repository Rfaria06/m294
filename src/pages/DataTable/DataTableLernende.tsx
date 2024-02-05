import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import "./DataTable.css";
import { getLernende } from "@/lib/querys";
import { Skeleton } from "@/components/ui/skeleton";

function DataTableLernende() {
  const TABLE_NAME = "lernende";
  useQueryClient();
  const { data, isPending } = useQuery({
    queryFn: getLernende,
    queryKey: ["lernende"],
  });

  return (
    <div>
      <div className="mb-3">
        <NavLink to={`/${TABLE_NAME}/create`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Neu</TooltipTrigger>
              <TooltipContent>
                <p>Einen neuen Lernenden erstellen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
      <div className="table">
        <h1>Lernende</h1>
        <Table>
          <TableHeader>
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="text-black">Vorname</TableHead>
            <TableHead className="text-black">Nachname</TableHead>
            <TableHead className="text-black">Email</TableHead>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                      <TableCell className="text-left" key={colIndex}>
                        <Skeleton className="w-full h-[25px] mb-2" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((row) => (
                  <TableRow key={row.id_lernende}>
                    <TableCell className="text-left">
                      <NavLink to={`/${TABLE_NAME}/${row.id_lernende}`}>
                        {row.id_lernende}
                      </NavLink>
                    </TableCell>
                    <TableCell className="text-left">{row.vorname} </TableCell>
                    <TableCell className="text-left">{row.nachname} </TableCell>
                    <TableCell className="text-left">{row.email} </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableLernende;
