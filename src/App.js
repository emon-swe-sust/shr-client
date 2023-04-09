import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import CreatePatient from "./patient/CreatePatient";
import { createContext, useState } from "react";

export const TokenContext = createContext(null);

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
  ]);

  const [token, setToken] = useState("");
  const value = { token, setToken };

  return (
    <TokenContext.Provider value={value}>
      <RouterProvider router={router} />
    </TokenContext.Provider>
  );
}

export default App;
