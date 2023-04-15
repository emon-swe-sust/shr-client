import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Navigate, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Button from "../components/Button";
import "./../index.css";
import {
  ButtonContainer,
  FormContainer,
  Input,
  InputContainer,
  Label,
  Title,
  DateInput,
  Select,
  Radio,
  Option,
} from "../components/InputFields";
import geoData from "./../components/geo_data.json";

// 98000100241

export const ModalBodyContainer = styled.div`
  display: flex;
`;

const HIDContainer = styled.div`
  font-size: x-large;
  color: #11643d;
  align-items: center;
  font-weight: bold;
`;

const CreatePatient = () => {
  const initialFormData = {
    given_name: "",
    sur_name: "",
    nid: "",
    date_of_birth: "",
    gender: "",
    present_address: {
      address_line: "",
      division_id: "",
      district_id: "",
      upazila_id: "",
    },
    confidential: "No",
    phone_number: {
      country_code: "008",
      area_code: "02",
      number: "",
      extension: "0984",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isShowModal, setIsShowModal] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [bivag, setBivag] = useState();
  const [zila, setZila] = useState();
  const [upozila, setUpozila] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      present_address: {
        [name]: value,
        division_id: "30",
        district_id: "26",
        upazila_id: "02",
      },
    }));
  };

  const handlePhoneNumberChange = (event) => {
    const number = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      phone_number: {
        country_code: "008",
        area_code: "02",
        extension: "0984",
        number: number,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempData = {
      ...formData,
      present_address: {
        address_line: `${formData.present_address.address_line}, ${upozila}, ${zila}, ${bivag}`,
        division_id: "30",
        district_id: "26",
        upazila_id: "02",
      },
    };

    const data = JSON.stringify(tempData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": sessionStorage.getItem("access_token"),
          From: "local-facility-admin@test.com",
          client_id: "18701",
        },
      };

      const response = await axios.post("/api/v1/patients", data, config);
      setIsShowModal(true);
      setPatientId(response.data.id);
      setFormData(initialFormData);
    } catch (error) {}
  };

  const onModalClose = () => {
    setIsShowModal(false);
    navigate(`/patient/${patientId}`);
  };

  return (
    <>
      <Navbar />
      {isShowModal && (
        <Modal onClose={onModalClose}>
          <ModalBodyContainer>
            <div>অভিনন্দন! রোগী নিবন্ধিত হয়েছে। নিবন্ধন নম্বর -</div>
            <HIDContainer>{patientId}</HIDContainer>
          </ModalBodyContainer>
        </Modal>
      )}
      <FormContainer onSubmit={handleSubmit}>
        <Title>নতুন রোগী নিবন্ধন করুন</Title>

        <InputContainer>
          <Label htmlFor="given_name">নামের প্রথম অংশ:</Label>
          <Input
            type="text"
            id="given_name"
            name="given_name"
            value={formData.given_name}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="sur_name">নামের শেষ অংশ:</Label>
          <Input
            type="text"
            id="sur_name"
            name="sur_name"
            value={formData.sur_name}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="phone_number">ফোন নম্বর:</Label>
          <Input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number.number}
            onChange={handlePhoneNumberChange}
            required
          />
          <Label htmlFor="nid">জাতীয় পরিচয়পত্র নম্বর:</Label>
          <Input
            type="text"
            id="nid"
            name="nid"
            value={formData.nid}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="date_of_birth">জন্ম তারিখ:</Label>
          <DateInput
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="gender">লিঙ্গ:</Label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <Option value="">-- লিঙ্গ নির্বাচন করুন --</Option>
            <Option value="M">পুরুষ </Option>
            <Option value="F">মহিলা </Option>
            <Option value="O">অন্যান্য </Option>
          </Select>
          <Label>বিভাগ:</Label>
          <Select
            id="bivag"
            name="bivag"
            value={bivag}
            onChange={(e) => setBivag(e.target.value)}
            required
          >
            <Option value="">-- বিভাগ নির্বাচন করুন--</Option>
            {geoData.map((district) => {
              return <Option value={district.Name}>{district.Name}</Option>;
            })}
          </Select>
          <Label>জেলা:</Label>
          <Select
            id="zilla"
            name="zilla"
            value={zila}
            onChange={(e) => setZila(e.target.value)}
            required
          >
            <Option value="">-- জেলা নির্বাচন করুন--</Option>
            {bivag === "চট্টগ্রাম" ? (
              <Option value="কুমিল্লা">কুমিল্লা </Option>
            ) : bivag === "ঢাকা" ? (
              <Option value="গোপালগঞ্জ">গোপালগঞ্জ </Option>
            ) : (
              <></>
            )}
          </Select>
          <Label>উপজেলা:</Label>
          <Select
            id="upozilla"
            name="upozilla"
            value={upozila}
            onChange={(e) => setUpozila(e.target.value)}
            required
          >
            <Option value="">-- উপজেলা নির্বাচন করুন--</Option>
            {zila === "কুমিল্লা" ? (
              geoData[0].Districts[0].Upazillas.map((upozila) => (
                <Option value={upozila}>{upozila}</Option>
              ))
            ) : zila === "গোপালগঞ্জ" ? (
              geoData[1].Districts[0].Upazillas.map((upozila) => (
                <Option value={upozila}>{upozila}</Option>
              ))
            ) : (
              <></>
            )}
          </Select>
          <Label htmlFor="address_line">ঠিকানা:</Label>
          <Input
            type="text"
            id="address_line"
            name="address_line"
            value={formData.present_address.address_line}
            onChange={handleAddressInputChange}
            required
          />
          <ButtonContainer>
            <Button version="success" type="submit">
              নিবন্ধন সম্পন্ন করুন
            </Button>
          </ButtonContainer>
        </InputContainer>
      </FormContainer>
    </>
  );
};

export default CreatePatient;
