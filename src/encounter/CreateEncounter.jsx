import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Navigate,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Button from "../components/Button";
import {
  ButtonContainer,
  FormContainer,
  Input,
  InputContainer,
  Label,
  Title,
} from "../patient/CreatePatient";

const CreateEncounter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const hid = params.hid;
  const initialFormData = {
    weight: "",
    bmi: "",
    body_temperature: "",
    pulse_rate: "",
    blood_pressure_systolic: "",
    blood_pressure_diastolic: "",
    uterus_length: "",
    other_complication: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isShowModal, setIsShowModal] = useState(false);
  const patientName = sessionStorage.getItem("patientName");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify(formData);
    const content = {
      content: data,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": sessionStorage.getItem("access_token"),
          From: "local-facility-admin@test.com",
          client_id: "18701",
        },
      };

      const response = await axios.post(
        `/v2/patients/${hid}/encounters`,
        content,
        config
      );
      setIsShowModal(true);
      setFormData(initialFormData);
    } catch (error) {}
  };

  const onModalClose = () => {
    setIsShowModal(false);
    navigate(`/view-encounters/${hid}`);
  };

  return (
    <>
      <Navbar />
      {isShowModal && (
        <Modal onClose={onModalClose}>অভিনন্দন! ভিজিট সম্পন্ন হয়েছে</Modal>
      )}
      <FormContainer onSubmit={handleSubmit}>
        <Title>
          ভিজিটের তথ্য পূরণ করুন {patientName && `| ${patientName}`}
        </Title>
        <InputContainer>
          <Label htmlFor="weight">ওজন (kg):</Label>
          <Input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="bmi">বি এম আই (kg/m²):</Label>
          <Input
            type="text"
            id="bmi"
            name="bmi"
            value={formData.bmi}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="body_temperature">তাপমাত্রা (°C):</Label>
          <Input
            type="text"
            id="body_temperature"
            name="body_temperature"
            value={formData.body_temperature}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="pulse_rate">নাড়ির স্পন্দন:</Label>
          <Input
            type="text"
            id="pulse_rate"
            name="pulse_rate"
            value={formData.pulse_rate}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="blood_pressure_systolic">
            সিস্টোলিক রক্ত চাপ (mmHg):
          </Label>
          <Input
            type="text"
            id="blood_pressure_systolic"
            name="blood_pressure_systolic"
            value={formData.blood_pressure_systolic}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="blood_pressure_diastolic">
            ডায়াস্টোলিক রক্ত চাপ (mmHg):
          </Label>
          <Input
            type="text"
            id="blood_pressure_diastolic"
            name="blood_pressure_diastolic"
            value={formData.blood_pressure_diastolic}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="uterus_length">জরায়ুর উচ্চতা(cm):</Label>
          <Input
            type="text"
            id="uterus_length"
            name="uterus_length"
            value={formData.uterus_length}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="other_complication">অন্যান্য জটিলতা :</Label>
          <Input
            type="text"
            id="other_complication"
            name="other_complication"
            value={formData.other_complication}
            onChange={handleInputChange}
            required
          />
          <ButtonContainer>
            <Button version="success" type="submit">
              জমা দিন
            </Button>
          </ButtonContainer>
        </InputContainer>
      </FormContainer>
    </>
  );
};

export default CreateEncounter;
