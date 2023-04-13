import React from "react";
import styled from "styled-components";
import Button from "./Button";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: auto;
  align-items: center;
  width: 500px;
  ${(props) =>
    props.height &&
    `
    height: ${props.height};
    overflow: scroll;
    width: 60vw;
    padding: 0;
  `}
`;

const StyledImg = styled.img`
  width: 120px;
`;

function Modal(props) {
  return (
    <ModalContainer>
      <ModalContent height={props.height}>
        {!props.height && (
          <StyledImg src={process.env.PUBLIC_URL + "/checked.png"} />
        )}
        {props.children}
        <Button onClick={() => props.onClose()} version="secondary">
          ঠিক আছে
        </Button>
      </ModalContent>
    </ModalContainer>
  );
}

export default Modal;
