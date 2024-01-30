"use client";

import { postLaender } from "@/lib/querys";
import {
	QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

function CreateLand() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postLaender,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["laender"],
      });
    },
  });
}

export default CreateLand;
