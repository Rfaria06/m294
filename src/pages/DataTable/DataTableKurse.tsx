import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { Row_kurse } from "@/lib/types";
import { getKurse } from "@/lib/querys";

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
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Kursnummer</TableHead>
          <TableHead className="text-white">Kursthema</TableHead>
          <TableHead className="text-white">Inhalt</TableHead>
          <TableHead className="text-white">Nr. Dozent</TableHead>
          <TableHead className="text-white">Startdatum</TableHead>
          <TableHead className="text-white">Enddatum</TableHead>
          <TableHead className="text-white">Dauer</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_kurs}>
              <td>
                <a href={`/${TABLE_NAME}/${row.id_kurs}`}>{row.id_kurs}</a>
              </td>
              <td>{row.kursnummer}</td>
              <td>{row.kursthema}</td>
              <td>{row.inhalt}</td>
              <td>{row.nr_dozent}</td>
              <td>{row.startdatum}</td>
              <td>{row.enddatum}</td>
              <td>{row.dauer}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableKurse;
