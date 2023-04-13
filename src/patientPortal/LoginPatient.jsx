import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { StyledImg } from "../components/Navbar";
import logo from "./../components/Govt.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  border: none;
  background-color: white;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 400px;
`;

const Button = styled.button`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 160px;
  background-color: #4caf50;
  margin-top: 24px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

// 98000104565

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  background-color: #0f4a4a;
  color: white;
  padding: 20px 50px;
  border: none;
  border-radius: 8px;
`;

const Title = styled.div`
  font-size: x-large;
`;

function LoginPatient() {
  const navigate = useNavigate();
  const [hid, setHId] = useState("");
  const email = "local-facility-admin@test.com";
  const password = "password";

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      navigate("/patient-portal");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/form-data",
            "X-Auth-Token": "local-shr-system-admin_auth_token",
            client_id: "18700",
          },
        };

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await axios.post("/signin", formData, config);

        sessionStorage.setItem("access_token", response.data.access_token);
        sessionStorage.setItem("hid", hid);
        navigate("/patient-portal");
      } catch (error) {}
    } else {
      alert("Please fill in both email and password fields");
    }
  };

  return (
    <>
      <Container>
        <Flex>
          <StyledImg src={logo} alt="logo" />
          <Title>
            প্রসূতি স্বাস্থ্য সেবা
            <br />
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার <br />
            স্বাস্থ্য ও পরিবার পরিকল্পনা মন্ত্রণালয়
          </Title>
        </Flex>
        <Form onSubmit={handleSubmit}>
          <h1>লগইন</h1>
          <Input
            type="text"
            placeholder="হেলথ আইডি"
            value={hid}
            onChange={(e) => setHId(e.target.value)}
            required
          />
          <Input type="password" placeholder="পাসওয়ার্ড" required />
          <Button type="submit">লগইন</Button>
        </Form>
      </Container>
    </>
  );
}

export default LoginPatient;
