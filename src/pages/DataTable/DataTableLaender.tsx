import { useEffect, useState } from "react";
import { Row_laender } from "@/lib/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./DataTable.css";
import { getLaender } from "@/lib/querys";

function DataTableLaender() {
  const TABLE_NAME = "countries";

  const [data, setData] = useState<Row_laender[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLaender();
        setData(result);
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
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Land</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id_country}>
              <td>
                <a href={`/${TABLE_NAME}/${row.id_country}`}>
                  {row.id_country}
                </a>
              </td>
              <td>{row.country}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableLaender;
