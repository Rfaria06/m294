import { useEffect, useRef, useState } from "react";
import { getLernende } from "@/lib/querys";
import { Row_lernende } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

function DataTableLernende() {
  const TABLE_NAME = "lernende";

  const [data, setData] = useState<Row_lernende[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLernende();
        setData(result);

        if (!hasFetchedData.current) {
          toast("Lernende erfolgreich geladen.");
          hasFetchedData.current = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table">
      <h1>Lernende</h1>
      <Table>
        <TableHeader>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Vorname</TableHead>
          <TableHead className="text-black">Nachname</TableHead>
          <TableHead className="text-black">Email</TableHead>
          <TableHead className="text-black">Lehrbetrieb</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_lernende}>
              <TableCell className="text-left">
                <NavLink to={`/${TABLE_NAME}/${row.id_lernende}`}>
                  {row.id_lernende}
                </NavLink>
              </TableCell>
              <TableCell className="text-left">{row.vorname} </TableCell>
              <TableCell className="text-left">{row.nachname} </TableCell>
              <TableCell className="text-left">{row.email} </TableCell>
              <TableCell className="text-left">{row.nr_land} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLernende;
