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
  nr_land: z
    .string()
    .regex(numberRegex, 'Muss eine gültige PLZ sein.')
    .optional(),
  geschlecht: z.enum(['m', 'w', 'd']).optional(),
  telefon: z.string().regex(phoneRegex, 'Ungültige Telefonnummer.').optional(),
  handy: z.string().regex(phoneRegex, 'Ungültige Handynummer').optional(),
  email: z.string().min(1).email('Muss eine gültige E-Mail sein.').optional(),
  email_privat: z
    .string()
    .min(1)
    .email('Muss eine gültige E-Mail sein.')
    .optional(),
  // birthate is a date picker,
  birthdate: z
    .string()
    .regex(dateRegex, 'Muss im Format JJJJ-MM-DD sein.')
    .optional(),
});

export default lernendeFormSchema;
