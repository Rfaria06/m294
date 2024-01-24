import { useEffect, useState } from "react";
import { getLehrbetriebe } from "@/lib/querys";
import { Row_lehrbetriebe } from "@/lib/types";
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
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Firma</TableHead>
          <TableHead className="text-black">Strasse</TableHead>
          <TableHead className="text-black">PLZ</TableHead>
          <TableHead className="text-black">Ort</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_lehrbetrieb}>
              <TableCell className="text-left">
                <NavLink to={`/${TABLE_NAME}/${row.id_lehrbetrieb}`}>
                  {row.id_lehrbetrieb}
                </NavLink>
              </TableCell>
              <TableCell className="text-left">{row.firma}</TableCell>
              <TableCell className="text-left">{row.strasse}</TableCell>
              <TableCell className="text-left">{row.plz}</TableCell>
              <TableCell className="text-left">{row.ort}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLehrbetriebe;
