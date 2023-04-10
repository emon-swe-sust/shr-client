import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Navigate,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 40px;
  margin: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
`;

const Label = styled.label`
  margin-top: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  width: 400px;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 80px;
  font-size: xx-large;
  border-bottom: 1px solid;
  text-align: center;
`;

const CreateEncounter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const hid = params.hid;
  const [formData, setFormData] = useState({
    weight: "",
    bmi: "",
    body_temperature: "",
    pulse_rate: "",
    blood_pressure_systolic: "",
    blood_pressure_diastolic: "",
    uterus_length: "",
    other_complication: "",
  });

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
        `http://localhost/v2/patients/${hid}/encounters`,
        content,
        config
      );
      alert(`Encounter created with id ${response.data.encounterId}`);
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <FormContainer onSubmit={handleSubmit}>
        <Title>Create Encounter</Title>
        <Label htmlFor="weight">Weight:</Label>
        <Input
          type="text"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="bmi">BMI:</Label>
        <Input
          type="text"
          id="bmi"
          name="bmi"
          value={formData.bmi}
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="body_temperature">Body Temperature:</Label>
        <Input
          type="text"
          id="body_temperature"
          name="body_temperature"
          value={formData.body_temperature}
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="pulse_rate">Pulse Rate:</Label>
        <Input
          type="text"
          id="pulse_rate"
          name="pulse_rate"
          value={formData.pulse_rate}
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="blood_pressure_systolic">
          Blood Pressure Systolic:
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
          Blood Pressure Diastolic:
        </Label>
        <Input
          type="text"
          id="blood_pressure_diastolic"
          name="blood_pressure_diastolic"
          value={formData.blood_pressure_diastolic}
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="uterus_length">Uterus Length:</Label>
        <Input
          type="text"
          id="uterus_length"
          name="uterus_length"
          value={formData.uterus_length}
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="other_complication">Other Complications:</Label>
        <Input
          type="text"
          id="other_complication"
          name="other_complication"
          value={formData.other_complication}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">Submit</Button>
      </FormContainer>
    </>
  );
};

export default CreateEncounter;
