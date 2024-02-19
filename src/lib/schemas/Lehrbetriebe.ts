import * as z from "zod";
import { plzRegex } from "./regex";

const lehrbetriebeFormSchema = z.object({
  firma: z.string({ required_error: "Pflichtfeld" }).max(100, {
    message: "Darf nicht länger als 100 Zeichen sein.",
  }),
  strasse: z
    .string()
    .max(100, {
      message: "Darf nicht länger als 100 Zeichen sein.",
    })
    .optional()
    .nullable(),
  plz: z
    .string({
      invalid_type_error: "Muss 4 Zeichen lang sein.",
    })
    .regex(plzRegex, "Muss eine gültige PLZ sein.")
    .optional()
    .nullable(),
  ort: z
    .string()
    .max(100, {
      message: "Darf nicht länger als 100 Zeichen sein.",
    })
    .optional()
    .nullable(),
});

export default lehrbetriebeFormSchema;
