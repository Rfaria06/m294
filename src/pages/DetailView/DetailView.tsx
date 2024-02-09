import { getSingle } from "@/lib/querys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import "./DetailView.css";
import DetailRow from "./DetailRow";

type Params = { tableName: string; id: string };

function DetailView() {
  useQueryClient();
  const { tableName, id } = useParams();
  let params: Params = { tableName: "", id: "" };

  const toggleDarkColor = (() => {
    let darkColor: boolean = false;
    return () => {
      darkColor = !darkColor;
      return darkColor;
    };
  })();

  const title = (): string => {
    if (!tableName) return "Details";
    return tableName?.charAt(0)?.toUpperCase() + tableName?.slice(1);
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

  return (
    <div className="container pt-16">
      <h1>{title()}</h1>
      {Object.keys(data ?? {}).map((key) => (
        <DetailRow
          key={key}
          label={key}
          value={data![key as unknown as keyof typeof data] ?? ""}
          darkColor={toggleDarkColor()}
        />
      ))}
    </div>
  );
}

export default DetailView;
