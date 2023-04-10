import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import CreatePatient from "./patient/CreatePatient";
import ViewPatient from "./patient/ViewPatient";
import CreateEncounter from "./encounter/CreateEncounter";
import ViewEncounter from "./encounter/ViewEncounter";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/create-patient",
      element: <CreatePatient />,
    },
    {
      path: "/",
      element: <CreatePatient />,
    },
    {
      path: "/patient/:hid",
      element: <ViewPatient />,
    },
    {
      path: "/create-encounter/:hid",
      element: <CreateEncounter />,
    },
    {
      path: "/view-encounters/:hid",
      element: <ViewEncounter />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
