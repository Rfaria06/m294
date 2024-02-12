export type Row_lehrbetriebe = {
  id: string;
  firma: string;
  strasse: string;
  plz: string;
  ort: string;
};

export type Row_lernende = {
  id: string;
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  nr_land: string;
  geschlecht: string;
  telefon: string;
  handy: string;
  email: string;
  email_privat: string;
  birthdate: string;
};

export type Row_lehrbetrieb_lernende = {
  id: string;
  nr_lehrbetrieb: string;
  nr_lernende: string;
  start: string;
  ende: string;
  beruf: string;
};

export type Row_laender = {
  id: string;
  country: string;
};

export type Row_dozenten = {
  id: string;
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  nr_land: string;
  geschlecht: string;
  telefon: string;
  handy: string;
  email: string;
  birthdate: string;
};

export type Row_kurse = {
  id: string;
  kursnummer: string;
  kursthema: string;
  inhalt: string;
  nr_dozent: string;
  startdatum: string;
  enddatum: string;
  dauer: string;
};

export type Row_kurse_lernende = {
  id: string;
  nr_teilnehmer: string;
  nr_kurs: string;
  note: string;
};
