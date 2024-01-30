import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import * as z from "zod";
import {
  dozentFormSchema,
  dozentUploadFormSchema,
  kursFormSchema,
} from "./schemas";
import {
  Row_dozenten,
  Row_kurse,
  Row_kurse_lernende,
  Row_laender,
  Row_lehrbetrieb_lernende,
  Row_lehrbetriebe,
  Row_lernende,
} from "./types";

const BASE_URL = "https://raul.undefiniert.ch/";

export async function getLernende(): Promise<Row_lernende[]> {
  const url = BASE_URL + "lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    toast("Lernende erfolgreich geladen");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

export async function getLehrbetriebe(): Promise<Row_lehrbetriebe[]> {
  const url = BASE_URL + "lehrbetriebe";
  try {
    const response = (await axios.get(url)) ?? [];
    toast("Lehrbetriebe erfolgreich geladen");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

export async function getLehrbetriebLernende(): Promise<
  Row_lehrbetrieb_lernende[]
> {
  const url = BASE_URL + "lehrbetrieb_lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    toast("Lehrbetriebe -> Lernende erfolgreich geladen");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

export async function getLaender(): Promise<Row_laender[]> {
  const url = BASE_URL + "laender";
  try {
    const response = (await axios.get(url)) ?? [];
    toast("Länder erfolgreich geladen");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

export async function getDozenten(): Promise<Row_dozenten[]> {
  const url = BASE_URL + "dozenten";
  try {
    const response = (await axios.get(url)) ?? [];
    toast("Dozenten erfolgreich geladen");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

export async function postDozenten(params: {
  data: z.infer<typeof dozentFormSchema>;
}): Promise<void> {
  const url: string = BASE_URL + "dozenten";
  try {
    const paramData = params.data;
    const uploadData: z.infer<typeof dozentUploadFormSchema> = {
      ...paramData,
      birthdate: getISODate(paramData.birthdate),
    };
    await axios.post(url, uploadData);
    toast("Dozent erstellt");
  } catch (error) {
    handleError(error);
  }
}

export async function getKurse(): Promise<Row_kurse[]> {
  const url: string = BASE_URL + "kurse";
  try {
    const response = (await axios.get(url)) ?? [];
    toast("Kurse erfolgreich geladen");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

export async function postKurs(params: {
  data: z.infer<typeof kursFormSchema>;
}) {
  const url: string = BASE_URL + "kurse";
  try {
    const paramData = params.data;
    await axios.post(url, {
      ...paramData,
      startdatum: getISODate(paramData.startdatum),
      enddatum: getISODate(paramData.enddatum),
    });
    toast("Kurs erstellt");
  } catch (error) {
    handleError(error);
  }
}

export async function getKurseLernende(): Promise<Row_kurse_lernende[]> {
  const url: string = BASE_URL + "kurse_lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    toast("Kurse -> Lernende erfolgreich geladen");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

function getISODate(date?: Date) {
  return date
    ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : undefined;
}

function handleError(error: unknown): void {
  if (!(error instanceof AxiosError) || !(error instanceof Error)) return;
  toast("Fehler bei der Anfrage: " + error.name, {
    description: error.message,
    className: "bg-red-75",
  });
}
