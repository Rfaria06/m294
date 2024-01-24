import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { Row_kurse } from "@/lib/types";
import { getKurse } from "@/lib/querys";
import { NavLink } from "react-router-dom";

function DataTableKurse() {
  const TABLE_NAME = "kurse";

  const [data, setData] = useState<Row_kurse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getKurse();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
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
          {data.map((row) => (
            <TableRow key={row.id_kurs}>
              <TableCell className="text-left">
                <NavLink to={`/${TABLE_NAME}/${row.id_kurs}`}>
                  {row.id_kurs}
                </NavLink>
              </TableCell>
              <TableCell className="text-left">{row.kursnummer}</TableCell>
              <TableCell className="text-left">{row.kursthema}</TableCell>
              <TableCell className="text-left">{row.inhalt}</TableCell>
              <TableCell className="text-left">{row.nr_dozent}</TableCell>
              <TableCell className="text-left">{row.startdatum}</TableCell>
              <TableCell className="text-left">{row.enddatum}</TableCell>
              <TableCell className="text-left">{row.dauer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableKurse;
