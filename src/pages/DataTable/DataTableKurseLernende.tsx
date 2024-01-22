import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { Row_kurse_lernende } from "@/lib/types";
import { getKurseLernende } from "@/lib/querys";

function DataTableKurseLernende() {
  const TABLE_NAME = "kurse_lernende";

  const [data, setData] = useState<Row_kurse_lernende[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getKurseLernende();
        setData(result);
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
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Nr. Teilnehmer</TableHead>
          <TableHead className="text-white">Nr. Kurs</TableHead>
          <TableHead className="text-white">Note</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_kurs_teilnehmer}>
              <td>
                <a href={`/${TABLE_NAME}/${row.id_kurs_teilnehmer}`}>
                  {row.id_kurs_teilnehmer}
                </a>
              </td>
              <td>{row.nr_teilnehmer}</td>
              <td>{row.nr_kurs}</td>
              <td>{row.note}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableKurseLernende;
