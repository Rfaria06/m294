import * as z from "zod";

const laenderFormSchema = z.object({
  country: z.string({ required_error: "Pflichtfeld" }).max(100, {
    message: "Darf nicht länger als 100 Zeichen sein",
  }),
});

export default laenderFormSchema;
