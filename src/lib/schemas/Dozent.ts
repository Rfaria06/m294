import * as z from 'zod';
import { numberRegex, phoneRegex, plzRegex } from './regex';

const dozentFormSchema = z.object({
  vorname: z
    .string({
      required_error: 'Vorname ist ein Pflichtfeld.',
    })
    .min(1, {
      message: 'Vorname muss mindestens 1 Zeichen lang sein.',
    }),
  nachname: z
    .string({
      required_error: 'Nachname ist ein Pflichtfeld.',
    })
    .min(1, {
      message: 'Nachname muss mindestens 1 Zeichen lang sein.',
    }),
  strasse: z
    .string()
    .min(1, {
      message: 'Straße muss mindestens 1 Zeichen lang sein.',
    })
    .optional(),
  plz: z
    .string({
      invalid_type_error: 'Muss 4 Zeichen lang sein.',
    })
    .regex(plzRegex, 'Muss 4 zeichen lang sein.')
    .min(4, {
      message: 'Muss 4 Zeichen lang sein.',
    })
    .max(4, {
      message: 'Muss 4 Zeichen lang sein.',
    })
    .optional(),
  ort: z
    .string()
    .min(1, {
      message: 'Ort muss mindestens 1 Zeichen lang sein.',
    })
    .optional(),
  // nr_land is a picker (constraint),
  nr_land: z.string().regex(numberRegex).optional(),
  // geschlecht is a picker [m, w, d],
  geschlecht: z.enum(['m', 'w', 'd']).optional(),
  telefon: z.string().regex(phoneRegex, 'Ungültige Telefonnummer.').optional(),
  handy: z.string().regex(phoneRegex, 'Ungültige Handynummer').optional(),
  email: z.string().min(1).email('Muss eine gültige E-Mail sein.').optional(),
  // birthate is a date picker,
  birthdate: z.coerce
    .date({ invalid_type_error: 'Ungültiges Datum' })
    .optional(),
});

export const dozentUploadFormSchema = z.object({
  vorname: z
    .string({
      required_error: 'Vorname ist ein Pflichtfeld.',
    })
    .min(1, {
      message: 'Vorname muss mindestens 1 Zeichen lang sein.',
    }),
  nachname: z
    .string({
      required_error: 'Nachname ist ein Pflichtfeld.',
    })
    .min(1, {
      message: 'Nachname muss mindestens 1 Zeichen lang sein.',
    }),
  strasse: z
    .string()
    .min(1, {
      message: 'Straße muss mindestens 1 Zeichen lang sein.',
    })
    .optional(),
  plz: z
    .string({
      invalid_type_error: 'Muss 4 Zeichen lang sein.',
    })
    .regex(plzRegex, 'Muss 4 zeichen lang sein.')
    .min(4, {
      message: 'Muss 4 Zeichen lang sein.',
    })
    .max(4, {
      message: 'Muss 4 Zeichen lang sein.',
    })
    .optional(),
  ort: z
    .string()
    .min(1, {
      message: 'Ort muss mindestens 1 Zeichen lang sein.',
    })
    .optional(),
  // nr_land is a picker (constraint),
  nr_land: z.string().regex(numberRegex).optional(),
  // geschlecht is a picker [m, w, d],
  geschlecht: z.enum(['m', 'w', 'd']).optional(),
  telefon: z.string().regex(phoneRegex, 'Ungültige Telefonnummer.').optional(),
  handy: z.string().regex(phoneRegex, 'Ungültige Handynummer').optional(),
  email: z.string().min(1).email('Muss eine gültige E-Mail sein.').optional(),
  // birthate is a date picker,
  birthdate: z.string().min(10).max(10).optional(),
});

export default dozentFormSchema;
