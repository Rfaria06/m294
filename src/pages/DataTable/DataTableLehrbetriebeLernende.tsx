import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getLehrbetriebLernende,
  getLehrbetriebe,
  getLernende,
} from "@/lib/querys";
import { NavLink } from "react-router-dom";
import "./DataTable.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { router } from "@/router";

function DataTableLehrbetriebeLernende() {
  const TABLE_NAME = "lehrbetriebe_lernende";
  useQueryClient();
  // eslint-disable-next-line prefer-const
  let { data, isPending, refetch } = useQuery({
    queryKey: ["lehrbetriebeLernende"],
    queryFn: getLehrbetriebLernende,
  });
  let { data: lehrbetriebData } = useQuery({
    queryKey: ["lehrbetriebe"],
    queryFn: getLehrbetriebe,
    initialData: [],
  });
  let { data: lernendeData } = useQuery({
    queryKey: ["lernende"],
    queryFn: getLernende,
    initialData: [],
  });

  const getLernendeFullName = (id: string): string => {
    if (!id) return "";
    const lernende = lernendeData.find((lernender) => lernender.id === id);
    if (!lernende) return "";
    return ` - ${lernende.vorname} ${lernende.nachname}`;
  };

  const getFirma = (id: string): string => {
    if (!id) return "";
    const lehrbetrieb = lehrbetriebData.find(
      (lehrbetrieb) => lehrbetrieb.id === id,
    );
    if (!lehrbetrieb) return "";
    return ` - ${lehrbetrieb.firma}`;
  };

  if (!JSON.stringify(data || {}).startsWith("[") || data === undefined) {
    refetch();
    data = [
      {
        id: "1",
        nr_lehrbetrieb: "",
        nr_lernende: "",
        start: "",
        ende: "",
        beruf: "",
      },
    ];
  }
  if (!lehrbetriebData || !JSON.stringify(lehrbetriebData).startsWith("["))
    lehrbetriebData = [
      {
        id: "0",
        firma: "Lädt...",
        strasse: "",
        plz: "",
        ort: "",
      },
    ];
  if (!lernendeData || !JSON.stringify(lernendeData).startsWith("["))
    lernendeData = [
      {
        id: "0",
        vorname: "Lädt...",
        nachname: "Lädt...",
        strasse: "",
        plz: "",
        ort: "",
        nr_land: "",
        geschlecht: "m",
        telefon: "",
        handy: "",
        email: "",
        email_privat: "",
        birthdate: "",
      },
    ];
  return (
    <div>
      <div className="mb-3">
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
      <div className="table">
        <h1>Lehrbetriebe ➞ Lernende</h1>
        <Table>
          <TableHeader>
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="text-black">Nr. Lehrbetrieb</TableHead>
            <TableHead className="text-black">Nr. Lernende</TableHead>
            <TableHead className="text-black">Start</TableHead>
            <TableHead className="text-black">Ende</TableHead>
            <TableHead className="text-black">Beruf</TableHead>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((_, colIndex) => (
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
                    <TableCell className="text-left">
                      {row.id ?? "id"}
                    </TableCell>
                    <TableCell className="text-left">
                      {row.nr_lehrbetrieb}
                      {getFirma(row.nr_lehrbetrieb)}
                    </TableCell>
                    <TableCell className="text-left">
                      {row.nr_lernende}
                      {getLernendeFullName(row.nr_lernende)}
                    </TableCell>
                    <TableCell className="text-left">{row.start}</TableCell>
                    <TableCell className="text-left">{row.ende}</TableCell>
                    <TableCell className="text-left">{row.beruf}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableLehrbetriebeLernende;
