import { createBrowserRouter } from "react-router-dom";
import Startpage from "./pages/Startpage/Startpage";
import DataTable from "./pages/DataTable/DataTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Startpage />,
  },
  {
    path: "/:table",
    element: <DataTable />,
  },
]);
