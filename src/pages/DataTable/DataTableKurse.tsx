import { Skeleton } from "@/components/ui/skeleton";
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
import { getKurse } from "@/lib/querys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import "./DataTable.css";

function DataTableKurse() {
  const TABLE_NAME = "kurse";
  useQueryClient();
  const { data, error, isError, isPending, isSuccess } = useQuery({
    queryKey: ["kurse"],
    queryFn: getKurse,
  });
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
                  <TableRow key={row.id_kurs}>
                    <TableCell className="text-left">
                      <NavLink to={`/${TABLE_NAME}/${row.id_kurs}`}>
                        {row.id_kurs}
                      </NavLink>
                    </TableCell>
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
        {isSuccess && toast("Kurse erfolgreich geladen")}
        {isError &&
          toast(error.name, {
            description: error.message ?? "",
            className: "bg-red-75",
          })}
      </div>
    </div>
  );
}

export default DataTableKurse;
