import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import CreatePatient from "./patient/CreatePatient";
import ViewPatient from "./patient/ViewPatient";
import CreateEncounter from "./encounter/CreateEncounter";
import ViewEncounter from "./encounter/ViewEncounter";
import LoginPatient from "./patientPortal/LoginPatient";
import PatientPortal from "./patientPortal/PatientPortal";
import "./fonts/SolaimanLipi.ttf";
import styled from "styled-components";

const Container = styled.div`
  font-family: "SulaimanLipi";
  font-size: 24px;
`;

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
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
    {
      path: "/login-patient",
      element: <LoginPatient />,
    },
    {
      path: "/patient-portal",
      element: <PatientPortal />,
    },
  ]);

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
