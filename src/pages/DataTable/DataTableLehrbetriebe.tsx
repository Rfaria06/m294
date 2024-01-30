import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLehrbetriebe } from "@/lib/querys";
import { Row_lehrbetriebe } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./DataTable.css";

function DataTableLehrbetriebe() {
  const TABLE_NAME = "lehrbetriebe";

  const [data, setData] = useState<Row_lehrbetriebe[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLehrbetriebe();
        setData(result);

        if (!hasFetchedData.current) {
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
