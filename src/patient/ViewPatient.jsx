import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

function ViewPatient() {
  const params = useParams();
  const navigate = useNavigate();
  const hid = params.hid;
  const [details, setDetails] = useState();

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

      const response = await axios.get(`/api/v1/patients/${hid}`, config);
      setDetails(response.data);
      sessionStorage.setItem("patientName", response.data.given_name);
    } catch (error) {}
  };

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/signin");
    }
    fetchPatientDetails();
  }, [hid]);

  const data = [
    {
      key: "নাম",
      value: details?.given_name || "",
    },
    {
      key: "পদবি",
      value: details?.sur_name || "",
    },
    {
      key: "জাতীয় পরিচয়পত্র নম্বর",
      value: details?.nid || "",
    },
    {
      key: "হেলথ আইডি ",
      value: details?.hid || "",
    },
    {
      key: "লিঙ্গ",
      value:
        details?.gender === "F"
          ? "মহিলা"
          : details?.gender === "M"
          ? "পুরুষ"
          : "অন্যান্য",
    },
    {
      key: "জন্ম তারিখ",
      value: details?.date_of_birth ? details?.date_of_birth.slice(0, 10) : "",
    },
    {
      key: "ঠিকানা",
      value: details?.present_address?.address_line || "",
    },
    {
      key: "গোপনীয়তা",
      value: details?.confidential || "",
    },
  ];

  return (
    <div>
      <Navbar />
      <Table
        column={columns}
        data={data}
        area={columnArea}
        tableTitle={`রোগীর বিবরণ | ${
          details?.given_name ? details.given_name : ""
        }`}
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
