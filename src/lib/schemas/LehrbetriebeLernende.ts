import { dateRegex, numberRegex } from '@/lib/schemas/regex';
import * as z from 'zod';

const lehrbetriebeLernendeFormSchema = z.object({
  nr_lehrbetrieb: z.string().regex(numberRegex, {
    message: 'Muss eine Zahl sein.',
  }),
  nr_lernende: z.string().regex(numberRegex, {
    message: 'Muss eine Zahl sein.',
  }),
  start: z
    .string()
    .regex(dateRegex, 'Muss im Format JJJJ-MM-DD sein.')
    .optional(),
  ende: z
    .string()
    .regex(dateRegex, 'Muss im Format JJJJ-MM-DD sein.')
    .optional(),
  beruf: z
    .string()
    .max(100, {
      message: 'Darf nicht länger als 100 Zeichen sein.',
    })
    .optional(),
});

export default lehrbetriebeLernendeFormSchema;
