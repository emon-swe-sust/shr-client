import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import { fetchPatientDetails } from "../components/utils";

function ViewPatient() {
  const params = useParams();
  const navigate = useNavigate();
  const hid = params.hid;
  const [profile, setProfile] = useState();
  const [patientDetails, setPatientDetails] = useState();

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
    fetchPatientDetails(hid, config, setProfile, setPatientDetails);
  }, [hid]);

  return (
    <div>
      <Navbar />
      <Table
        column={columns}
        data={profile}
        area={columnArea}
        tableTitle={`রোগীর বিবরণ | ${
          patientDetails?.given_name ? patientDetails.given_name : ""
        } | ${patientDetails?.hid ? patientDetails.hid : ""}`}
        titleButtons={[
          <Button onClick={() => navigate(`/create-encounter/${hid}`)}>
            ভিজিটের তথ্য দিন
          </Button>,
          <Button
            onClick={() => navigate(`/view-encounters/${hid}`)}
            version={"secondary"}
          >
            ভিজিটের তথ্য দেখুন
          </Button>,
        ]}
      />
    </div>
  );
}

export default ViewPatient;
