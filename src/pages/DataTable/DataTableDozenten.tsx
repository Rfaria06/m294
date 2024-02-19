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
import { getDozenten } from "@/lib/querys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import "./DataTable.css";
import { router } from "@/router";

function DataTableDozenten() {
  const TABLE_NAME = "dozenten";
  useQueryClient();
  // eslint-disable-next-line prefer-const
  let { data, isPending, refetch } = useQuery({
    queryKey: ["dozenten"],
    queryFn: getDozenten,
    initialData: [],
  });
  if (!JSON.stringify(data || {}).startsWith("[") || data === undefined) {
    refetch();
    data = [
      {
        id: "1",
        vorname: "Max",
        nachname: "Mustermann",
        email: "max@mustermann.com",
        strasse: "Musterstrasse 1",
        plz: "12345",
        ort: "Musterstadt",
        nr_land: "",
        geschlecht: "m",
        telefon: "123456789",
        handy: "987654321",
        birthdate: "01.01.1970",
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
      <div className="table bg-white">
        <h1>Dozenten</h1>
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
                    <TableCell className="text-left">{row.vorname}</TableCell>
                    <TableCell className="text-left">{row.nachname}</TableCell>
                    <TableCell className="text-left">{row.email}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableDozenten;
