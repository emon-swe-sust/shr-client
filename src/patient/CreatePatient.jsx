import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Navigate, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const DateInput = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  width: 400px;
  text-align: center;
`;

const Select = styled.select`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 400px;
  border: 1px solid #ccc;
  text-align: center;
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

const CreatePatient = () => {
  const [formData, setFormData] = useState({
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
  });
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
        ...prevState.present_address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/form-data",
          "X-Auth-Token": sessionStorage.getItem("access_token"),
          From: "local-facility-admin@test.com",
          client_id: "18701",
        },
      };

      const response = await axios.post(
        "http://localhost:8081/api/v1/patients",
        data,
        config
      );

      sessionStorage.setItem("access_token", response.data.access_token);
      navigate("/");
    } catch (error) {}
    console.log(formData);
    console.log(data);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Create Patient</Title>
      <Label htmlFor="given_name">Given Name:</Label>
      <Input
        type="text"
        id="given_name"
        name="given_name"
        value={formData.given_name}
        onChange={handleInputChange}
        required
      />
      <Label htmlFor="sur_name">Surname:</Label>
      <Input
        type="text"
        id="sur_name"
        name="sur_name"
        value={formData.sur_name}
        onChange={handleInputChange}
        required
      />
      <Label htmlFor="nid">National ID:</Label>
      <Input
        type="text"
        id="nid"
        name="nid"
        value={formData.nid}
        onChange={handleInputChange}
        required
      />
      <Label htmlFor="date_of_birth">Date of Birth:</Label>
      <DateInput
        type="date"
        id="date_of_birth"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleInputChange}
        required
      />
      <Label htmlFor="gender">Gender:</Label>
      <Select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
        required
      >
        <option value="">-- Select Gender --</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </Select>
      <Label htmlFor="address_line">Address:</Label>
      <Input
        type="text"
        id="address_line"
        name="address_line"
        value={formData.present_address.address_line}
        onChange={handleAddressInputChange}
        required
      />
      <Label htmlFor="division_id">Division:</Label>
      <Input
        type="text"
        id="division_id"
        name="division_id"
        value={formData.present_address.division_id}
        onChange={handleAddressInputChange}
        required
      />
      <Label htmlFor="district_id">District:</Label>
      <Input
        type="text"
        id="district_id"
        name="district_id"
        value={formData.present_address.district_id}
        onChange={handleAddressInputChange}
        required
      />
      <Label htmlFor="upazila_id">Upazila:</Label>
      <Input
        type="text"
        id="upazila_id"
        name="upazila_id"
        value={formData.present_address.upazila_id}
        onChange={handleAddressInputChange}
        required
      />
      <Label htmlFor="confidential">Confidential:</Label>
      <Select
        id="confidential"
        name="confidential"
        value={formData.confidential}
        onChange={handleInputChange}
        required
      >
        <option value="">-- Select Confidentiality --</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </Select>
      <Button type="submit">Submit</Button>
    </FormContainer>
  );
};

export default CreatePatient;
