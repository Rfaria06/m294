import * as z from "zod";
import { numberRegex } from "./regex";

const kursFormSchema = z.object({
  kursnummer: z
    .string()
    .regex(numberRegex, "Muss genau 3 Ziffern sein.")
    .length(3, "Muss genau 7 Ziffern sein.")
    .optional(),
  kursthema: z.string().min(1).max(100, "Maximal 100 Zeichen.").optional(),
  inhalt: z.string().min(1).max(100, "Maximal 100 Zeichen.").optional(),
  nr_dozent: z.string().regex(numberRegex, "Muss eine Zahl sein.").optional(),
  startdatum: z.coerce
    .date({ invalid_type_error: "Ungültiges Datum" })
    .optional(),
  enddatum: z.coerce
    .date({ invalid_type_error: "Ungültiges Datum" })
    .optional(),
  dauer: z
    .string()
    .refine((value) => {
      const intValue = parseInt(value, 10);
      return !isNaN(intValue) && intValue >= 0 && intValue <= 127;
    }, "Muss eine Zahl zwischen 0 und 127 sein.")
    .optional(),
});

export default kursFormSchema;
