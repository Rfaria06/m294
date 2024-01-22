import { useEffect, useState } from "react";
import { Row_lehrbetrieb_lernende } from "@/lib/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { getLehrbetriebLernende } from "@/lib/querys";

function DataTableLehrbetriebeLernende() {
  const TABLE_NAME = "lehrbetriebe_lernende";

  const [data, setData] = useState<Row_lehrbetrieb_lernende[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLehrbetriebLernende();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table">
      <h1>Lehrbetriebe -{`>`} Lernende</h1>
      <Table>
        <TableHeader>
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Nr. Lehrbetrieb</TableHead>
          <TableHead className="text-white">Nr. Lernende</TableHead>
          <TableHead className="text-white">Start</TableHead>
          <TableHead className="text-white">Ende</TableHead>
          <TableHead className="text-white">Beruf</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_lehrbetrieb_lernende}>
              <a href={`/${TABLE_NAME}/${row.id_lehrbetrieb_lernende}`}>
                <td>{row.id_lehrbetrieb_lernende}</td>
              </a>
              <td>{row.nr_lehrbetrieb}</td>
              <td>{row.nr_lernende}</td>
              <td>{row.start}</td>
              <td>{row.ende}</td>
              <td>{row.beruf}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLehrbetriebeLernende;
