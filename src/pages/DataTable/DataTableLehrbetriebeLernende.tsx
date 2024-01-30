import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLehrbetriebLernende } from "@/lib/querys";
import { Row_lehrbetrieb_lernende } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./DataTable.css";

function DataTableLehrbetriebeLernende() {
  const TABLE_NAME = "lehrbetriebe_lernende";

  const [data, setData] = useState<Row_lehrbetrieb_lernende[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLehrbetriebLernende();
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
      <h1>Lehrbetriebe -{`>`} Lernende</h1>
      <Table>
        <TableHeader>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Nr. Lehrbetrieb</TableHead>
          <TableHead className="text-black">Nr. Lernende</TableHead>
          <TableHead className="text-black">Start</TableHead>
          <TableHead className="text-black">Ende</TableHead>
          <TableHead className="text-black">Beruf</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_lehrbetrieb_lernende}>
              <TableCell className="text-left">
                <NavLink to={`/${TABLE_NAME}/${row.id_lehrbetrieb_lernende}`}>
                  {row.id_lehrbetrieb_lernende}
                </NavLink>
              </TableCell>
              <TableCell className="text-left">{row.nr_lehrbetrieb}</TableCell>
              <TableCell className="text-left">{row.nr_lernende}</TableCell>
              <TableCell className="text-left">{row.start}</TableCell>
              <TableCell className="text-left">{row.ende}</TableCell>
              <TableCell className="text-left">{row.beruf}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLehrbetriebeLernende;
