import { createBrowserRouter } from 'react-router-dom';
import {
  CreateDozent,
  CreateKurs,
  CreateKurseLernende,
  CreateLand,
  CreateLehrbetrieb,
  CreateLehrbetriebeLernende,
  CreateLernende,
} from './pages/CreateRecord';
import {
  DataTableDozenten,
  DataTableKurse,
  DataTableKurseLernende,
  DataTableLaender,
  DataTableLehrbetriebe,
  DataTableLehrbetriebeLernende,
  DataTableLernende,
} from './pages/DataTable';
import ErrorPage from './pages/Error/ErrorPage';
import Startpage from './pages/Startpage/Startpage';
import InfoPage from './pages/Info/InfoPage';
import DetailView from './pages/DetailView/DetailView';
import {
  EditDozent,
  EditKurs,
  EditKurseLernende,
  EditLand,
  EditLehrbetrieb,
  EditLehrbetriebeLernende,
  EditLernende,
} from './pages/EditRecord';
import LoginPage from './pages/login/loginPage';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <h1 className="font-bold text-white">404 - Not found</h1>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <Startpage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/info',
    element: <InfoPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lernende',
    element: <DataTableLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lehrbetriebe',
    element: <DataTableLehrbetriebe />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lehrbetriebe_lernende',
    element: <DataTableLehrbetriebeLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/laender',
    element: <DataTableLaender />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dozenten',
    element: <DataTableDozenten />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/kurse',
    element: <DataTableKurse />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/kurse_lernende',
    element: <DataTableKurseLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lernende/create',
    element: <CreateLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lehrbetriebe/create',
    element: <CreateLehrbetrieb />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lehrbetriebe_lernende/create',
    element: <CreateLehrbetriebeLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/laender/create',
    element: <CreateLand />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dozenten/create',
    element: <CreateDozent />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/kurse/create',
    element: <CreateKurs />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/kurse_lernende/create',
    element: <CreateKurseLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:tableName/:id',
    element: <DetailView />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lernende/:id/edit',
    element: <EditLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lehrbetriebe/:id/edit',
    element: <EditLehrbetrieb />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lehrbetriebe_lernende/:id/edit',
    element: <EditLehrbetriebeLernende />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/laender/:id/edit',
    element: <EditLand />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dozenten/:id/edit',
    element: <EditDozent />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/kurse/:id/edit',
    element: <EditKurs />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/kurse_lernende/:id/edit',
    element: <EditKurseLernende />,
    errorElement: <ErrorPage />,
  },
]);
