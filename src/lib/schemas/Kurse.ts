import * as z from "zod";
import { dateRegex, numberRegex } from "./regex";

const kursFormSchema = z.object({
  kursnummer: z
    .string()
    .regex(numberRegex, "Muss genau 3 Ziffern sein.")
    .length(3, "Muss genau 7 Ziffern sein."),
  kursthema: z
    .string()
    .min(1)
    .max(100, "Maximal 100 Zeichen.")
    .optional()
    .or(z.literal("")),
  inhalt: z
    .string()
    .min(1)
    .max(100, "Maximal 100 Zeichen.")
    .optional()
    .or(z.literal("")),
  nr_dozent: z
    .string()
    .regex(numberRegex, "Muss eine Zahl sein.")
    .optional()
    .or(z.literal("")),
  startdatum: z
    .string()
    .regex(dateRegex, "Muss im Format JJJJ-MM-DD sein.")
    .optional()
    .or(z.literal("")),
  enddatum: z
    .string()
    .regex(dateRegex, "Muss im Format JJJJ-MM-DD sein.")
    .optional()
    .or(z.literal("")),
  dauer: z
    .string()
    .refine((value) => {
      const intValue = parseInt(value, 10);
      return !isNaN(intValue) && intValue >= 0 && intValue <= 127;
    }, "Muss eine Zahl zwischen 0 und 127 sein.")
    .optional()
    .or(z.literal("")),
});

export default kursFormSchema;
