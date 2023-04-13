import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./../index.css";
import logo from "./Govt.png";
import "./../fonts/SolaimanLipi.ttf";

const Nav = styled.div`
  background-color: #0f4a4a;
  color: white;
  position: sticky;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  font-family: "SulaimanLipi";
`;

const LeftPart = styled.div`
  margin-left: 13vw;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const RightPart = styled.div`
  margin-right: 13vw;
  ${({ isPatient }) => isPatient && `margin-left:auto;`}
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
  background-color: #eceaea;
  &:hover {
    background-color: white;
  }
`;

export const StyledImg = styled.img`
  height: 80px;
`;

function Navbar(props) {
  const navigate = useNavigate();
  const [hid, setHID] = useState("");

  const handleHIDChange = (event) => {
    setHID(event.target.value);
  };

  const onLogout = () => {
    console.log("clicked");

    sessionStorage.removeItem("access_token");
    if (props.isPatient) {
      navigate("/login-patient");
    } else {
      navigate("/login");
    }
  };

  return (
    <Nav>
      <LeftPart>
        <StyledImg src={logo} alt="logo" />
        প্রসূতি স্বাস্থ্য সেবা
        {window.location.href.includes("gopalgonj")
          ? " (গোপালগঞ্জ সদর)"
          : window.location.href.includes("cumilla")
          ? " (কুমিল্লা সদর)"
          : ""}
        <br />
        গণপ্রজাতন্ত্রী বাংলাদেশ সরকার <br />
        স্বাস্থ্য ও পরিবার পরিকল্পনা মন্ত্রণালয়
      </LeftPart>
      {!props.isPatient && (
        <>
          <MiddlePart>
            <Input
              type="text"
              placeholder="রোগীর হেলথ আইডি"
              value={hid}
              onChange={handleHIDChange}
            />
            <Button
              version={"success"}
              onClick={() => navigate(`/patient/${hid}`)}
            >
              খুজুন
            </Button>
          </MiddlePart>
        </>
      )}
      <RightPart isPatient={props.isPatient}>
        {!props.isPatient && (
          <Button
            backgroundColor={"white"}
            color={"#26AC8C"}
            onClick={() => navigate("/")}
          >
            নতুন রোগী নিবন্ধন
          </Button>
        )}
        <Button
          onClick={() => onLogout()}
          backgroundColor={"#0F4A4A"}
          color={"white"}
        >
          লগ আউট
        </Button>
      </RightPart>
    </Nav>
  );
}

export default Navbar;
