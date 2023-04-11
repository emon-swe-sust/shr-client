import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Navigate, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Button from "../components/Button";

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 40px;
  margin: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  background-color: white;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const Label = styled.label`
  margin-top: 1rem;
  font-weight: bold;
  margin-right: auto;
  font-size: large;
`;

export const Input = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  width: 400px;
  height: 28px;
  border-radius: 5px;
  background-color: #eceaea;
  margin-bottom: 24px;
  &:hover {
    background-color: white;
  }
  &:focus {
    background-color: white;
  }
`;

export const DateInput = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  width: 400px;
  text-align: center;
  height: 24px;
  border-radius: 5px;
  background-color: #eceaea;
  margin-bottom: 24px;
  &:hover {
    //background-color: #cbeaf8;
    background-color: white;
  }
  &:focus {
    background-color: white;
  }
`;

export const Select = styled.select`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 24px;
  &:hover {
    background-color: white;
  }
  &:focus {
    background-color: white;
  }
`;

export const Title = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 80px;
  font-size: xx-large;
  border-bottom: 1px solid;
  text-align: center;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;
`;

export const ModalBodyContainer = styled.div`
  display: flex;
`;

const HIDContainer = styled.div`
  font-size: x-large;
  color: #11643d;
  align-items: center;
  font-family: "Courier New", Courier, monospace;
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isShowModal, setIsShowModal] = useState(false);
  const [patientId, setPatientId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) {
      navigate("/signin");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify(formData);
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
            <div>অভিনন্দন! রোগী নিবন্ধিত হয়েছে। নিবন্ধন নম্বর -</div>{" "}
            <HIDContainer>{patientId}</HIDContainer>
          </ModalBodyContainer>
        </Modal>
      )}
      <FormContainer onSubmit={handleSubmit}>
        <Title>নতুন রোগী নিবন্ধন করুন</Title>

        <InputContainer>
          <Label htmlFor="given_name">নাম :</Label>
          <Input
            type="text"
            id="given_name"
            name="given_name"
            value={formData.given_name}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="sur_name">পদবি :</Label>
          <Input
            type="text"
            id="sur_name"
            name="sur_name"
            value={formData.sur_name}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="nid">জাতীয় পরিচয়পত্র নম্বর :</Label>
          <Input
            type="text"
            id="nid"
            name="nid"
            value={formData.nid}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="date_of_birth">জন্ম তারিখ :</Label>
          <DateInput
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="gender">লিঙ্গ :</Label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">-- লিঙ্গ নির্বাচন করুন --</option>
            <option value="M">পুরুষ </option>
            <option value="F">মহিলা </option>
            <option value="O">অন্যান্য </option>
          </Select>
          <Label htmlFor="address_line">ঠিকানা :</Label>
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
