import * as z from "zod";
import { numberRegex } from "./regex";

const kurseLernendeFormSchema = z.object({
  nr_teilnehmer: z.string().regex(numberRegex, {
    message: "Muss eine Zahl sein.",
  }),
  nr_kurs: z.string().regex(numberRegex, {
    message: "Muss eine Zahl sein.",
  }),
  note: z
    .string()
    .refine((value) => {
      const intValue = parseInt(value, 10);
      return !isNaN(intValue) && intValue >= 0 && intValue <= 6;
    }, "Muss eine Zahl zwischen 0 und 6 sein.")
    .optional(),
});

export default kurseLernendeFormSchema;

