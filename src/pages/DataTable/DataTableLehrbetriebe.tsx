import { useEffect, useState } from "react";
import { getLehrbetriebe } from "@/lib/querys";
import { Row_lehrbetriebe } from "@/lib/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";

function DataTableLehrbetriebe() {
  const TABLE_NAME = "lehrbetriebe";

  const [data, setData] = useState<Row_lehrbetriebe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLehrbetriebe();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table">
      <h1>Lehrbetriebe</h1>
      <Table>
        <TableHeader>
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Firma</TableHead>
          <TableHead className="text-white">Strasse</TableHead>
          <TableHead className="text-white">PLZ</TableHead>
          <TableHead className="text-white">Ort</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_lehrbetrieb}>
              <a href={`/${TABLE_NAME}/${row.id_lehrbetrieb}`}>
                <td>{row.id_lehrbetrieb}</td>
              </a>
              <td>{row.firma}</td>
              <td>{row.strasse}</td>
              <td>{row.plz}</td>
              <td>{row.ort}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLehrbetriebe;
