"use client";

import { Form } from "@/components/ui/form";
import { postKurseLernende } from "@/lib/querys";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

function CreateKurseLernende() {
  const queryClient: QueryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postKurseLernende,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kurseLernende"] });
    },
  });

  return (
    <div>
      <Form></Form>
    </div>
  );
}

export default CreateKurseLernende;
