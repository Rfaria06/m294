import { useEffect, useState } from "react";
import { Row_dozenten } from "@/lib/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { getDozenten } from "@/lib/querys";

function DataTableDozenten() {
  const TABLE_NAME = "dozenten";

  const [data, setData] = useState<Row_dozenten[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDozenten();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table">
      <h1>Dozenten</h1>
      <Table>
        <TableHeader>
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Vorname</TableHead>
          <TableHead className="text-white">Nachname</TableHead>
          <TableHead className="text-white">Email</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_dozent}>
              <td>
                <a href={`/${TABLE_NAME}/${row.id_dozent}`}>{row.id_dozent}</a>
              </td>
              <td>{row.vorname}</td>
              <td>{row.nachname}</td>
              <td>{row.email}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableDozenten;
