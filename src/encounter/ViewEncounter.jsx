import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import styled from "styled-components";
import { fetchPatientEncounters } from "../components/utils";

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
      navigate("/login");
    }
  }, []);

  const columns = ["key", "value"];

  const columnArea = {
    key: "40%",
    value: "60%",
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": sessionStorage.getItem("access_token"),
      From: "local-facility-admin@test.com",
      client_id: "18701",
    },
  };
  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/login");
    }
    fetchPatientEncounters(hid, config, setEncounters);
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

// 98000100266
