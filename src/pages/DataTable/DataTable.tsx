import { useParams } from "react-router-dom";

function DataTable() {
  const { table } = useParams();
  return <h1>{table}</h1>;
}

export default DataTable;
