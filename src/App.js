import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import CreatePatient from "./patient/CreatePatient";
import ViewPatient from "./patient/ViewPatient";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
