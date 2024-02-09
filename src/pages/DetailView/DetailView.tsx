import { getSingle } from "@/lib/querys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Params = { tableName: string; id: string };

function DetailView() {
  useQueryClient();
  const { tableName, id } = useParams();
  let params: Params = { tableName: "", id: "" };

  if (!tableName || !id) {
    toast("Ungültige URL");
  } else {
    params = { tableName, id };
  }

  const { data } =
    useQuery({
      queryFn: () => getSingle(params),
      queryKey: [tableName],
    }) || {};

  return (
    <div>
      <h1>Test</h1>
      {Object.keys(data ?? {}).map((key) => (
        <p key={key}>{String(key)}</p>
      ))}
    </div>
  );
}

export default DetailView;
