import { useEffect, useRef, useState } from "react";
import { Row_laender } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { getLaender } from "@/lib/querys";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

function DataTableLaender() {
  const TABLE_NAME = "countries";

  const [data, setData] = useState<Row_laender[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLaender();
        setData(result);

        if (!hasFetchedData.current) {
          toast("Länder erfolgreich geladen.");
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
      <h1>Länder</h1>
      <Table>
        <TableHeader>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Land</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_country}>
              <TableCell className="text-left">
                <NavLink to={`/${TABLE_NAME}/${row.id_country}`}>
                  {row.id_country}
                </NavLink>
              </TableCell>
              <TableCell className="text-left">{row.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLaender;
