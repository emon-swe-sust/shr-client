import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  fetchPatientDetails,
  fetchPatientEncounters,
} from "../components/utils";

const Label = styled.div`
  margin: auto;
  text-align: center;
  margin: 24px;
  font-size: xx-large;
`;

const StyledThead = styled.div`
  background-color: #019595;
  color: white;
  font-size: x-large;
  border: none;
  border-radius: 10px;
  height: 60px;
  display: flex;
  width: 70%;
  align-items: center;
  cursor: pointer;
  margin: auto;
  margin-bottom: 24px;
  text-align: center;
  display: flex;
  padding: 0 24px;
  justify-content: space-between;
`;

function PatientPortal() {
  const hid = sessionStorage.getItem("hid");
  const [profile, setProfile] = useState();
  const [encounters, setEncounters] = useState();
  const [patientDetails, setPatientDetails] = useState();
  const [showEncounter, setShowEncounter] = useState();
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": sessionStorage.getItem("access_token"),
      From: "local-facility-admin@test.com",
      client_id: "18701",
    },
  };

  const columns = ["key", "value"];

  const columnArea = {
    key: "40%",
    value: "60%",
  };

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/login-patient");
    }
    fetchPatientDetails(hid, config, setProfile, setPatientDetails);
    fetchPatientEncounters(hid, config, setEncounters);
  }, []);

  const onItemClick = (id) => {
    if (id === showEncounter) {
      setShowEncounter();
    } else {
      setShowEncounter(id);
    }
  };

  return (
    <div>
      <Navbar isPatient={true} />
      <Table
        fromPatient={true}
        column={columns}
        data={profile}
        area={columnArea}
        tableTitle={`রোগীর বিবরণ | ${
          patientDetails && patientDetails.given_name
        } | ${patientDetails && patientDetails.hid}`}
      />

      <Label>ভিজিট সমূহের বিবরণ </Label>
      {/* {encounters &&
        encounters.map((encounter, id) => {
          return (
            <Table
              fromPatient={true}
              column={columns}
              data={encounter}
              area={columnArea}
              tableTitle={`ভিজিট - ${id + 1}`}
            />
          );
        })} */}

      {encounters &&
        encounters.map((enc, id) => {
          return (
            <>
              <StyledThead onClick={() => onItemClick(id + 1)}>
                <div>{`ভিজিট - ${id + 1}`}</div>
                {showEncounter === id + 1 ? (
                  <div>বন্ধ করুন</div>
                ) : (
                  <div>বিস্তারিত দেখুন</div>
                )}
              </StyledThead>
              {showEncounter && showEncounter === id + 1 && (
                <Table
                  fromPatient={true}
                  column={columns}
                  data={enc}
                  area={columnArea}
                  noTitle={true}
                />
              )}
            </>
          );
        })}
    </div>
  );
}

export default PatientPortal;
