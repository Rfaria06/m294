import * as z from "zod";
import { phoneRegex } from "./regex";

export const dozentFormSchema = z.object({
  vorname: z.string().min(1, {
    message: "Vorname muss mindestens 1 Zeichen lang sein.",
  }),
  nachname: z.string().min(1, {
    message: "Nachname muss mindestens 1 Zeichen lang sein.",
  }),
  strasse: z
    .string()
    .min(1, {
      message: "Straße muss mindestens 1 Zeichen lang sein.",
    })
    .optional(),
  plz: z
    .number()
    .min(4, {
      message: "PLZ muss genau 4 Zeichen lang sein.",
    })
    .max(4, {
      message: "PLZ muss genau 4 Zeichen lang sein.",
    })
    .optional(),
  ort: z
    .string()
    .min(1, {
      message: "Ort muss mindestens 1 Zeichen lang sein.",
    })
    .optional(),
  // nr_land is a picker (constraint),
  nr_land: z.number().optional(),
  // geschlecht is a picker [m, w, d],
  geschlecht: z.enum(["m", "w", "d"]).optional(),
  telefon: z.string().regex(phoneRegex, "Ungültige Telefonnummer.").optional(),
  handy: z.string().regex(phoneRegex, "Ungültige Handynummer").optional(),
  email: z.string().min(1).email("Muss eine gültige E-Mail sein.").optional(),
  // birthate is a date picker,
  birthdate: z.date().optional(),
});

export default dozentFormSchema;
