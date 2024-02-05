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
import { getLehrbetriebe } from "@/lib/querys";
import { Skeleton } from "@/components/ui/skeleton";

function DataTableLehrbetriebe() {
  const TABLE_NAME = "lehrbetriebe";
  useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["lehrbetriebe"],
    queryFn: getLehrbetriebe,
  });

  return (
    <div>
      <div className="mb-3">
        <NavLink to={`/${TABLE_NAME}/create`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Neu</TooltipTrigger>
              <TooltipContent>
                <p>Einen neuen Lehrbetrieb erstellen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
      <div className="table">
        <h1>Lehrbetriebe</h1>
        <Table>
          <TableHeader>
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="text-black">Firma</TableHead>
            <TableHead className="text-black">Strasse</TableHead>
            <TableHead className="text-black">PLZ</TableHead>
            <TableHead className="text-black">Ort</TableHead>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 5 }).map((_, colIndex) => (
                      <TableCell className="text-left" key={colIndex}>
                        <Skeleton className="w-full h-[25px] mb-2" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((row) => (
                  <TableRow key={row.id_lehrbetrieb}>
                    <TableCell className="text-left">
                      <NavLink to={`/${TABLE_NAME}/${row.id_lehrbetrieb}`}>
                        {row.id_lehrbetrieb}
                      </NavLink>
                    </TableCell>
                    <TableCell className="text-left">{row.firma}</TableCell>
                    <TableCell className="text-left">{row.strasse}</TableCell>
                    <TableCell className="text-left">{row.plz}</TableCell>
                    <TableCell className="text-left">{row.ort}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableLehrbetriebe;
