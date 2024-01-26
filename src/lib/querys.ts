import axios from "axios";
import {
  Row_dozenten,
  Row_kurse,
  Row_kurse_lernende,
  Row_laender,
  Row_lehrbetrieb_lernende,
  Row_lehrbetriebe,
  Row_lernende,
} from "./types";
import DozentUpload from "@/lib/schemas/DozentUpload.ts";
import * as z from "zod";

const BASE_URL = "https://raul.undefiniert.ch/";

export async function getLernende(): Promise<Row_lernende[]> {
  const url = BASE_URL + "lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    return response.data.data;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function getLehrbetriebe(): Promise<Row_lehrbetriebe[]> {
  const url = BASE_URL + "lehrbetriebe";
  try {
    const response = (await axios.get(url)) ?? [];
    return response.data.data;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function getLehrbetriebLernende(): Promise<
  Row_lehrbetrieb_lernende[]
> {
  const url = BASE_URL + "lehrbetrieb_lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    return response.data.data;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function getLaender(): Promise<Row_laender[]> {
  const url = BASE_URL + "laender";
  try {
    const response = (await axios.get(url)) ?? [];
    return response.data.data;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function getDozenten(): Promise<Row_dozenten[]> {
  const url = BASE_URL + "dozenten";
  try {
    const response = (await axios.get(url)) ?? [];
    return response.data.data;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function postDozenten(
  data: z.infer<typeof DozentUpload>,
): Promise<boolean> {
  const url: string = BASE_URL + "dozenten";
  try {
    await axios.post(url, data);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getKurse(): Promise<Row_kurse[]> {
  const url: string = BASE_URL + "kurse";
  try {
    const response = (await axios.get(url)) ?? [];
    return response.data.data;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function getKurseLernende(): Promise<Row_kurse_lernende[]> {
  const url: string = BASE_URL + "kurse_lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    return response.data.data;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}
