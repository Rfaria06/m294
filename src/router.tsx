import { createBrowserRouter } from "react-router-dom";
import Startpage from "./pages/Startpage/Startpage";
import DataTableLernende from "./pages/DataTable/DataTableLernende";
import DataTableLehrbetriebe from "./pages/DataTable/DataTableLehrbetriebe";
import DataTableLehrbetriebeLernende from "./pages/DataTable/DataTableLehrbetriebeLernende";
import DataTableLaender from "./pages/DataTable/DataTableLaender";
import DataTableDozenten from "./pages/DataTable/DataTableDozenten";
import DataTableKurse from "./pages/DataTable/DataTableKurse";
import DataTableKurseLernende from "./pages/DataTable/DataTableKurseLernende";

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
