import * as z from 'zod';
import { plzRegex } from './regex';

const lehrbetriebeFormSchema = z.object({
	firma: z
		.string()
		.max(100, {
			message: 'Darf nicht länger als 100 Zeichen sein.',
		})
		.optional(),
	strasse: z
		.string()
		.max(100, {
			message: 'Darf nicht länger als 100 Zeichen sein.',
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
		.max(100, {
			message: 'Darf nicht länger als 100 Zeichen sein.',
		})
		.optional(),
});

export default lehrbetriebeFormSchema;
