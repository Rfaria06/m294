import * as z from 'zod';
import { dateRegex, numberRegex, phoneRegex, plzRegex } from './regex';

const lernendeFormSchema = z.object({
  vorname: z
    .string()
    .min(1, 'Muss mindestens 1 Zeichen lang sein.')
    .max(50, 'Darf höchstens 50 Zeichen lang sein'),
  nachname: z
    .string()
    .min(1, 'Muss mindestens 1 Zeichen lang sein.')
    .max(50, 'Darf höchstens 50 Zeichen lang sein'),
  strasse: z
    .string()
    .max(100, 'Darf höchstens 100 Zeichen lang sein.')
    .optional()
    .or(z.literal('')),
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
    .optional()
    .or(z.literal('')),
  ort: z
    .string()
    .min(1, {
      message: 'Ort muss mindestens 1 Zeichen lang sein.',
    })
    .optional()
    .or(z.literal('')),
  nr_land: z
    .string()
    .regex(numberRegex, 'Muss eine gültige PLZ sein.')
    .optional()
    .or(z.literal('')),
  geschlecht: z.enum(['m', 'w', 'd']).optional().or(z.literal('')),
  telefon: z
    .string()
    .regex(phoneRegex, 'Ungültige Telefonnummer.')
    .optional()
    .or(z.literal('')),
  handy: z
    .string()
    .regex(phoneRegex, 'Ungültige Handynummer')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .min(1)
    .email('Muss eine gültige E-Mail sein.')
    .optional()
    .or(z.literal('')),
  email_privat: z
    .string()
    .min(1)
    .email('Muss eine gültige E-Mail sein.')
    .optional()
    .or(z.literal('')),
  // birthate is a date picker,
  birthdate: z
    .string()
    .regex(dateRegex, 'Muss im Format JJJJ-MM-DD sein.')
    .optional()
    .or(z.literal('')),
});

export default lernendeFormSchema;
