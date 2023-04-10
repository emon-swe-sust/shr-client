import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import CreatePatient from "./patient/CreatePatient";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
