import { createBrowserRouter } from "react-router-dom";
import Startpage from "./pages/Startpage/Startpage";
import {
  DataTableDozenten,
  DataTableKurse,
  DataTableKurseLernende,
  DataTableLaender,
  DataTableLehrbetriebe,
  DataTableLehrbetriebeLernende,
  DataTableLernende,
} from "./pages/DataTable";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <h1>404 - Not found</h1>,
  },
  {
    path: "/",
    element: <Startpage />,
  },
  {
    path: "/lernende",
    element: <DataTableLernende />,
  },
  {
    path: "/lehrbetriebe",
    element: <DataTableLehrbetriebe />,
  },
  {
    path: "/lehrbetriebe_lernende",
    element: <DataTableLehrbetriebeLernende />,
  },
  {
    path: "/laender",
    element: <DataTableLaender />,
  },
  {
    path: "/dozenten",
    element: <DataTableDozenten />,
  },
  {
    path: "/kurse",
    element: <DataTableKurse />,
  },
  {
    path: "/kurse_lernende",
    element: <DataTableKurseLernende />,
  },
]);
