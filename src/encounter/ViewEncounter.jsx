import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

function ViewEncounter() {
  const params = useParams();
  const navigate = useNavigate();
  const hid = params.hid;
  const [encounters, setEncounters] = useState();

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/signin");
    }
  }, []);

  const columns = ["key", "value"];

  const columnArea = {
    key: "40%",
    value: "60%",
  };
  const fetchPatientDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": sessionStorage.getItem("access_token"),
          From: "local-facility-admin@test.com",
          client_id: "18701",
        },
      };

      const response = await axios.get(
        `http://localhost/v2/patients/${hid}/encounters`,
        config
      );
      const entries = [];
      const encounterEntries = [];
      response.data.entries.forEach((entry, idx) => {
        entries.push(JSON.parse(entry.content));
      });
      entries.forEach((entry) => {
        const data = [
          {
            key: "Weight",
            value: entry?.weight || "",
          },
          {
            key: "BMI",
            value: entry?.bmi || "",
          },
          {
            key: "Body Temperature",
            value: entry?.body_temperature || "",
          },
          {
            key: "Pulse Rate",
            value: entry?.pulse_rate || "",
          },
          {
            key: "Uterus Length",
            value: entry?.uterus_length || "",
          },
          {
            key: "Blood Pressure Systolic",
            value: entry?.blood_pressure_systolic || "",
          },
          {
            key: "Blood Pressure Diastolic",
            value: entry?.blood_pressure_diastolic || "",
          },
          {
            key: "Other Complications",
            value: entry?.other_complication || "",
          },
        ];
        encounterEntries.push(data);
      });
      setEncounters(encounterEntries);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [hid]);

  return (
    <div>
      <Navbar />
      {encounters &&
        encounters.map((encounter, id) => {
          return (
            <Table
              column={columns}
              data={encounter}
              area={columnArea}
              tableTitle={`Encounter ${id}`}
            />
          );
        })}
    </div>
  );
}

export default ViewEncounter;
