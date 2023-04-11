import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";

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

const Title = styled.div`
  margin-bottom: 160px;
  font-size: xx-large;
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useParams();

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);

  const handleemailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
        navigate("/");
      } catch (error) {}
    } else {
      alert("Please fill in both email and password fields");
    }
  };

  return (
    <>
      <Container>
        <Title>
          {window.location.href.includes("savar") ? "সাভার" : "সাটুরিয়া"} উপজেলা
          স্বাস্থ্য কমপ্লেক্স
        </Title>
        <Form onSubmit={handleSubmit}>
          <h1>লগইন</h1>
          <Input
            type="text"
            placeholder="ইমেইল"
            value={email}
            onChange={handleemailChange}
          />
          <Input
            type="password"
            placeholder="পাসওয়ার্ড"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit">লগইন</Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
