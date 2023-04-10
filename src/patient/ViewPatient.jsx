import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewPatient() {
  const params = useParams();
  const hid = params.hid;
  const [details, setDetails] = useState();

  const columns = ["key", "value"];

  const columnArea = {
    key: "40%",
    value: "60%",
  };

  const fetchPatientDetails = async () => {
    console.log("first");
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
        `http://localhost/api/v1/patients/${hid}`,
        config
      );
      setDetails(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [hid]);

  const data = [
    {
      key: "Given Name",
      value: details?.given_name || "",
    },
    {
      key: "Sur Name",
      value: details?.sur_name || "",
    },
    {
      key: "NID",
      value: details?.nid || "",
    },
    {
      key: "HID",
      value: details?.hid || "",
    },
    {
      key: "Gender",
      value:
        details?.gender === "F"
          ? "Female"
          : details?.gender === "M"
          ? "Male"
          : "",
    },
    {
      key: "Date of Birth",
      value: details?.date_of_birth ? details?.date_of_birth.slice(0, 10) : "",
    },
    {
      key: "Address",
      value: details?.present_address?.address_line || "",
    },
    {
      key: "Confidentiality",
      value: details?.confidential || "",
    },
  ];

  console.log(details?.present_address?.address_line);
  return (
    <div>
      <Navbar />
      <Table
        column={columns}
        data={data}
        area={columnArea}
        tableTitle={`Patient Details - ${
          details?.given_name ? details.given_name : ""
        }`}
      />
    </div>
  );
}

export default ViewPatient;
