import { useEffect, useState } from "react";
import { getLernende } from "@/lib/querys";
import { Row_lernende } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";

function DataTableLernende() {
  const TABLE_NAME = "lernende";

  const [data, setData] = useState<Row_lernende[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLernende();
        setData(result);
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
        <TableCaption className="text-white">Lernende</TableCaption>
        <TableHeader>
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Vorname</TableHead>
          <TableHead className="text-white">Nachname</TableHead>
          <TableHead className="text-white">Email</TableHead>
          <TableHead className="text-white">Lehrbetrieb</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_lernende}>
              <a href={`/${TABLE_NAME}/${row.id_lernende}`}>
                <td>{row.id_lernende}</td>
              </a>
              <td>{row.vorname}</td>
              <td>{row.nachname}</td>
              <td>{row.email}</td>
              <td>{row.nr_land}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLernende;
