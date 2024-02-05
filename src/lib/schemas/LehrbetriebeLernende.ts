import { numberRegex } from "@/lib/schemas/regex";
import * as z from "zod";

const lehrbetriebeLernendeFormSchema = z.object({
  nr_lehrbetrieb: z.string().regex(numberRegex, {
    message: "Muss eine Zahl sein.",
  }),
  nr_lernende: z.string().regex(numberRegex, {
    message: "Muss eine Zahl sein.",
  }),
  start: z.date().optional(),
  ende: z.date().optional(),
  beruf: z
    .string()
    .max(100, {
      message: "Darf nicht länger als 100 Zeichen sein.",
    })
    .optional(),
});

export default lehrbetriebeLernendeFormSchema;
