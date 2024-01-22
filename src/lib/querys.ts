import axios from "axios";
import {
  Row_lehrbetriebe,
  Row_lernende,
  Row_lehrbetrieb_lernende,
  Row_laender,
  Row_dozenten,
  Row_kurse,
  Row_kurse_lernende,
} from "./types";

const BASE_URL = "https://raul.undefiniert.ch/";

export async function getLernende(): Promise<Row_lernende[]> {
  const url = BASE_URL + "lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    const responseData: Row_lernende[] = response.data.data;
    return responseData;
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
    const responseData: Row_lehrbetriebe[] = response.data.data;
    return responseData;
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
    const responseData: Row_lehrbetrieb_lernende[] = response.data.data;
    return responseData;
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
    const responseData: Row_laender[] = response.data.data;
    return responseData;
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
    const responseData: Row_dozenten[] = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function getKurse(): Promise<Row_kurse[]> {
  const url = BASE_URL + "kurse";
  try {
    const response = (await axios.get(url)) ?? [];
    const responseData: Row_kurse[] = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}

export async function getKurseLernende(): Promise<Row_kurse_lernende[]> {
  const url = BASE_URL + "kurse_lernende";
  try {
    const response = (await axios.get(url)) ?? [];
    const responseData: Row_kurse_lernende[] = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Error making GET request.");
    console.error("URL =>", url);
    console.error("Error =>", error);
    throw error;
  }
}
