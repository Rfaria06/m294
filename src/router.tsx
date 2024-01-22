import { createBrowserRouter } from "react-router-dom";
import Startpage from "./pages/Startpage/Startpage";
import DataTableLernende from "./pages/DataTable/DataTableLernende";
import DataTableLehrbetriebe from "./pages/DataTable/DataTableLehrbetriebe";
import DataTableLehrbetriebeLernende from "./pages/DataTable/DataTableLehrbetriebeLernende";

export const router = createBrowserRouter([
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
]);
