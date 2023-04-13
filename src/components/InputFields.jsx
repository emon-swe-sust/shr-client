import styled from "styled-components";
import { Form, Navigate, redirect, useNavigate } from "react-router-dom";

export const Radio = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 1.5em;
  height: 1.5em;
  border: 2px solid;
  border-radius: 50%;
  ::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 0.75em;
    height: 0.75em;
    margin: 3px;
  }
`;
export const ButtonContainer = styled.div`
  margin-top: 24px;
`;

export const Input = styled.input`
  margin-top: 0.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  width: 400px;
  border-radius: 5px;
  font-size: large;
  background-color: #eceaea;
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
  &:hover {
    background-color: white;
  }
  &:focus {
    background-color: white;
  }
`;

export const Select = styled.select`
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  
  &:hover {
    background-color: white;
  }
  &:focus {
    background-color: white;
  }
`;

export const Option = styled.option`
  font-size: large;
  margin: 40px 0;
`;

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
  margin-top: 40px;
  font-size: x-large;
`;

export const Title = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 80px;
  padding-bottom: 30px;
  font-size: 36px;
  border-bottom: 1px solid;
  text-align: center;
  font-weight: bold;
  border-color: #16e6b5;
`;

export const RadioButtonWrapper = styled.div`
  display: flex;
  margin-left: 24px;
  margin-right: auto;
  margin-top: 12px;
`;

export const RadioButtonInput = styled.input.attrs({ type: "radio" })`
  appearance: none;
  margin: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #017001;
  outline: none;
  transition: all 0.2s ease-in-out;

  background-color: ${(props) => (props.selected ? "#34f534" : "white")};

  &:hover {
    transform: scale(1.1);
  }
`;

export const RadioButtonLabel = styled.label`
  margin: auto;
  margin-left: 16px;
`;
