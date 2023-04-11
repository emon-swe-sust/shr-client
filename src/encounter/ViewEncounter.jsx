import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import styled from "styled-components";

const CreateButton = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function ViewEncounter() {
  const params = useParams();
  const navigate = useNavigate();
  const hid = params.hid;
  const [encounters, setEncounters] = useState();
  const patientName = sessionStorage.getItem("patientName");

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
        `/v2/patients/${hid}/encounters`,
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
            key: "ওজন (kg)",
            value: entry?.weight || "",
          },
          {
            key: "বি এম আই (kg/m²)",
            value: entry?.bmi || "",
          },
          {
            key: "তাপমাত্রা (°C)",
            value: entry?.body_temperature || "",
          },
          {
            key: "নাড়ির স্পন্দন",
            value: entry?.pulse_rate || "",
          },
          {
            key: "জরায়ুর উচ্চতা (cm)",
            value: entry?.uterus_length || "",
          },
          {
            key: "সিস্টোলিক রক্ত চাপ (mmHg)",
            value: entry?.blood_pressure_systolic || "",
          },
          {
            key: "ডায়াস্টোলিক রক্ত চাপ (mmHg)",
            value: entry?.blood_pressure_diastolic || "",
          },
          {
            key: "অন্যান্য জটিলতা",
            value: entry?.other_complication || "",
          },
        ];
        encounterEntries.push(data);
      });
      setEncounters(encounterEntries);
    } catch (error) {}
  };

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/signin");
    }
    fetchPatientDetails();
  }, [hid]);

  return (
    <Div>
      <Navbar />
      <CreateButton>
        <Button
          version="secondary"
          onClick={() => navigate(`/create-encounter/${hid}`)}
        >
          নতুন ভিজিটের তথ্য দিন
        </Button>
      </CreateButton>
      {encounters &&
        encounters.map((encounter, id) => {
          return (
            <Table
              column={columns}
              data={encounter}
              area={columnArea}
              tableTitle={`ভিজিট - ${id + 1} ${
                patientName && `| ${patientName}`
              }`}
            />
          );
        })}
    </Div>
  );
}

export default ViewEncounter;
