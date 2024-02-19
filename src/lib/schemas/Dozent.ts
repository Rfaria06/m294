import * as z from "zod";
import { dateRegex, numberRegex, phoneRegex, plzRegex } from "./regex";

const dozentFormSchema = z.object({
  vorname: z
    .string({
      required_error: "Vorname ist ein Pflichtfeld.",
    })
    .min(1, {
      message: "Vorname muss mindestens 1 Zeichen lang sein.",
    }),
  nachname: z
    .string({
      required_error: "Nachname ist ein Pflichtfeld.",
    })
    .min(1, {
      message: "Nachname ist ein Pflichtfeld.",
    }),
  strasse: z
    .string()
    .max(255, "Darf maximal 255 Zeichen lang sein.")
    .optional()
    .or(z.literal("")),
  plz: z
    .string({
      invalid_type_error: "Muss 4 Zeichen lang sein.",
    })
    .regex(plzRegex, "Muss 4 zeichen lang sein.")
    .optional()
    .or(z.literal("")),
  ort: z
    .string()
    .max(255, "Darf maximal 255 Zeichen lang sein.")
    .optional()
    .or(z.literal("")),
  // nr_land is a picker (constraint),
  nr_land: z.string().regex(numberRegex).optional().or(z.literal("")),
  // geschlecht is a picker [m, w, d],
  geschlecht: z.enum(["m", "w", "d"]).optional().or(z.literal("")),
  telefon: z
    .string()
    .regex(phoneRegex, "Ungültige Telefonnummer.")
    .optional()
    .or(z.literal("")),
  handy: z
    .string()
    .regex(phoneRegex, "Ungültige Handynummer")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Muss eine gültige E-Mail sein.")
    .optional()
    .or(z.literal("")),
  // birthate is a date picker,
  birthdate: z
    .string()
    .regex(dateRegex, "Muss im Format JJJJ-MM-DD sein.")
    .optional()
    .or(z.literal("")),
});

export const dozentUploadFormSchema = z.object({
  vorname: z
    .string({
      required_error: "Vorname ist ein Pflichtfeld.",
    })
    .min(1, {
      message: "Vorname muss mindestens 1 Zeichen lang sein.",
    }),
  nachname: z
    .string({
      required_error: "Nachname ist ein Pflichtfeld.",
    })
    .min(1, {
      message: "Nachname muss mindestens 1 Zeichen lang sein.",
    }),
  strasse: z
    .string()
    .min(1, {
      message: "Straße muss mindestens 1 Zeichen lang sein.",
    })
    .optional()
    .or(z.literal("")),
  plz: z
    .string({
      invalid_type_error: "Muss 4 Zeichen lang sein.",
    })
    .regex(plzRegex, "Muss 4 zeichen lang sein.")
    .min(4, {
      message: "Muss 4 Zeichen lang sein.",
    })
    .max(4, {
      message: "Muss 4 Zeichen lang sein.",
    })
    .optional()
    .or(z.literal("")),
  ort: z
    .string()
    .min(1, {
      message: "Ort muss mindestens 1 Zeichen lang sein.",
    })
    .optional()
    .or(z.literal("")),
  // nr_land is a picker (constraint),
  nr_land: z.string().regex(numberRegex).optional().or(z.literal("")),
  // geschlecht is a picker [m, w, d],
  geschlecht: z.enum(["m", "w", "d"]).optional().or(z.literal("")),
  telefon: z
    .string()
    .regex(phoneRegex, "Ungültige Telefonnummer.")
    .optional()
    .or(z.literal("")),
  handy: z
    .string()
    .regex(phoneRegex, "Ungültige Handynummer")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .min(1)
    .email("Muss eine gültige E-Mail sein.")
    .optional()
    .or(z.literal("")),
  // birthate is a date picker,
  birthdate: z.string().min(10).max(10).optional().or(z.literal("")),
});

export default dozentFormSchema;
