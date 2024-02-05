import { createBrowserRouter } from "react-router-dom";
import {
  CreateDozent,
  CreateKurs,
  CreateKurseLernende,
  CreateLand,
  CreateLehrbetrieb,
  CreateLehrbetriebeLernende,
} from "./pages/CreateRecord";
import {
  DataTableDozenten,
  DataTableKurse,
  DataTableKurseLernende,
  DataTableLaender,
  DataTableLehrbetriebe,
  DataTableLehrbetriebeLernende,
  DataTableLernende,
} from "./pages/DataTable";
import ErrorPage from "./pages/Error/ErrorPage";
import Startpage from "./pages/Startpage/Startpage";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <h1>404 - Not found</h1>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Startpage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lernende",
    element: <DataTableLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lehrbetriebe",
    element: <DataTableLehrbetriebe />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lehrbetriebe_lernende",
    element: <DataTableLehrbetriebeLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/laender",
    element: <DataTableLaender />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dozenten",
    element: <DataTableDozenten />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kurse",
    element: <DataTableKurse />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kurse_lernende",
    element: <DataTableKurseLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lernende/create",
    element: <DataTableLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lehrbetriebe/create",
    element: <CreateLehrbetrieb />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lehrbetriebe_lernende/create",
    element: <CreateLehrbetriebeLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/laender/create",
    element: <CreateLand />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dozenten/create",
    element: <CreateDozent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kurse/create",
    element: <CreateKurs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kurse_lernende/create",
    element: <CreateKurseLernende />,
    errorElement: <ErrorPage />,
  },
]);
