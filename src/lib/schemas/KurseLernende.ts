import * as z from 'zod';
import { numberRegex } from './regex';

const kurseLernendeFormSchema = z.object({
  nr_teilnehmer: z.string().regex(numberRegex, {
    message: 'Muss eine Zahl sein.',
  }),
  nr_kurs: z.string().regex(numberRegex, {
    message: 'Muss eine Zahl sein.',
  }),
  note: z
    .string()
    .refine((value) => {
      // Allow one decimal place, convert to float, and check the range
      const floatValue = parseFloat(value.replace(',', '.'));
      return !isNaN(floatValue) && floatValue >= 1.0 && floatValue <= 6.0;
    }, 'Muss eine Zahl zwischen 1.0 und 6.0 sein.')
    .optional()
    .or(z.literal('')),
});

export default kurseLernendeFormSchema;
