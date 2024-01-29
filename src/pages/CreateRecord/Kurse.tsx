import { postKurs } from "@/lib/querys";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

function CreateKurs() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postKurs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kurse"] });
    },
  });
}
