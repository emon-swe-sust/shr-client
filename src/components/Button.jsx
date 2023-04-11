import React from "react";
import styled from "styled-components";

const ButtonPrimary = styled.button`
  background-color: #c3d0d4;
  cursor: pointer;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 12px;
  text-decoration: none;
  font-size: large;
  font-weight: bold;
  &:hover {
    background-color: #c9c9c9;
  }
`;

const ButtonDanger = styled(ButtonPrimary)`
  background-color: #ee1818;
  &:hover {
    background-color: #ed5555;
  }
  color: white;
`;

const ButtonSuccess = styled(ButtonPrimary)`
  background-color: #05e782;
  &:hover {
    background-color: #55eda9;
  }
`;

const ButtonSecondary = styled(ButtonPrimary)`
  background-color: #089aee;
  &:hover {
    background-color: #55b5ed;
  }
  color: white;
`;

function Button(props) {
  if (props.version === "primary")
    return (
      <ButtonPrimary onClick={props.onClick}>{props.children}</ButtonPrimary>
    );
  else if (props.version === "danger")
    return (
      <ButtonDanger onClick={props.onClick}>{props.children}</ButtonDanger>
    );
  else if (props.version === "success")
    return (
      <ButtonSuccess onClick={props.onClick}>{props.children}</ButtonSuccess>
    );
  else if (props.version === "secondary")
    return (
      <ButtonSecondary onClick={props.onClick}>
        {props.children}
      </ButtonSecondary>
    );
  else
    return (
      <ButtonPrimary onClick={props.onClick}>{props.children}</ButtonPrimary>
    );
}

export default Button;
