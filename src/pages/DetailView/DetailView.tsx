import { getSingle } from "@/lib/querys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import "./DetailView.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Params = { tableName: string; id: string };

function DetailView() {
  useQueryClient();
  const { tableName, id } = useParams();
  let params: Params = { tableName: "", id: "" };

  const title = (): string => {
    if (!tableName) return "Details";
    return (
      tableName?.charAt(0)?.toUpperCase() +
      tableName?.slice(1).replace(/_/g, " ➞ ")
    );
  };

  if (!tableName || !id) {
    toast("Ungültige URL");
  } else {
    params = { tableName, id };
  }

  const { data } = useQuery({
    queryFn: () => getSingle(params),
    queryKey: [tableName],
  });

  const formatKey = (key: string): string =>
    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ". ");

  const formatValue = (value: string): string => {
    switch (value) {
      case "m":
        value = "Männlich";
        break;
      case "w":
        value = "Weiblich";
        break;
      case "d":
        value = "Divers";
        break;
      case "UNBEKANNT":
        value = "";
        break;
      case "null":
        value = "";
        break;
    }
    return value;
  };

  return (
    <div className="container p-2">
      <div>
        <h1>{title()}</h1>
      </div>
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead>Schlüssel</TableHead>
            <TableHead>Wert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(data ?? {}).map((key) => (
            <TableRow key={key}>
              <TableCell>{formatKey(key)}</TableCell>
              <TableCell>
                {formatValue(data![key as keyof typeof data]) ?? ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DetailView;
