import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Nav = styled.div`
  background-color: #363535;
  color: white;
  position: sticky;
  width: 100%;
  height: 60px;
  display: flex;
`;

const LeftPart = styled.div`
  margin-left: 120px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const RightPart = styled.div`
  margin-right: 120px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const MiddlePart = styled.div`
  margin: auto;
  display: flex;
  gap: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 400px;
  align-items: center;
  margin: auto;
`;

function Navbar() {
  const navigate = useNavigate();
  const [hid, setHID] = useState("");

  const handleHIDChange = (event) => {
    setHID(event.target.value);
  };

  const onLogout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/signin");
  };

  return (
    <Nav>
      <LeftPart>
        <Button version={"primary"} onClick={() => navigate("/")}>
          Create Patient
        </Button>
      </LeftPart>
      <MiddlePart>
        <Input
          type="text"
          placeholder="Patient HID"
          value={hid}
          onChange={handleHIDChange}
        />
        <Button version={"success"} onClick={() => navigate(`/patient/${hid}`)}>
          Search
        </Button>
      </MiddlePart>
      <RightPart>
        <Button onClick={onLogout} version={"danger"}>
          Logout
        </Button>
      </RightPart>
    </Nav>
  );
}

export default Navbar;
