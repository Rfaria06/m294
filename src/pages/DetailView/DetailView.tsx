import { getSingle } from '@/lib/querys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function DetailView() {
  useQueryClient();
  const { tableName, id } = useParams();
  if (!tableName || !id) return null; // Return null or another component when tableName or id is falsy

  debugger;
  const { data } =
    useQuery({
      queryFn: () => getSingle({ tableName, id }),
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
