import { useEffect, useRef, useState } from "react";
import { Row_dozenten } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { getDozenten } from "@/lib/querys";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

function DataTableDozenten() {
  const TABLE_NAME = "dozenten";

  const [data, setData] = useState<Row_dozenten[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDozenten();
        setData(result);

        if (!hasFetchedData.current) {
          toast("Dozenten erfolgreich geladen");
          hasFetchedData.current = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-3">
        <a href={`/${TABLE_NAME}/create`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Neu</TooltipTrigger>
              <TooltipContent>
                <p>Einen neuen Dozent erstellen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </a>
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
            {data.map((row) => (
              <TableRow key={row.id_dozent}>
                <TableCell className="text-left">
                  <NavLink to={`/${TABLE_NAME}/${row.id_dozent}`}>
                    {row.id_dozent}
                  </NavLink>
                </TableCell>
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
