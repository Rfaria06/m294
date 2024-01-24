import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { Row_kurse_lernende } from "@/lib/types";
import { getKurseLernende } from "@/lib/querys";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

function DataTableKurseLernende() {
  const TABLE_NAME = "kurse_lernende";

  const [data, setData] = useState<Row_kurse_lernende[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getKurseLernende();
        setData(result);

        // Show toast only if it hasn't been shown before
        if (!hasFetchedData.current) {
          toast("Kurse -> Lernende erfolgreich geladen.");
          hasFetchedData.current = true; // Set the ref to indicate that the toast has been shown
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table">
      <h1>Kurse -{`>`} Lernende</h1>
      <Table>
        <TableHeader>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Nr. Teilnehmer</TableHead>
          <TableHead className="text-black">Nr. Kurs</TableHead>
          <TableHead className="text-black">Note</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_kurs_teilnehmer}>
              <TableCell className="text-left">
                <NavLink to={`/${TABLE_NAME}/${row.id_kurs_teilnehmer}`}>
                  {row.id_kurs_teilnehmer}
                </NavLink>
              </TableCell>
              <TableCell className="text-left">{row.nr_teilnehmer}</TableCell>
              <TableCell className="text-left">{row.nr_kurs}</TableCell>
              <TableCell className="text-left">{row.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableKurseLernende;
