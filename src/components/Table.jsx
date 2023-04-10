import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  width: 70%;
  margin: auto;
  margin-bottom: 60px;
  border-radius: 10px;
  margin-top: 24px;
`;

const StyledTable = styled.div`
  width: 100%;
`;

const StyledThead = styled.div`
  background-color: #019595;
  color: white;
  font-size: x-large;
  border: none;
  border-radius: 10px;
  height: 80px;
  display: flex;
  width: 100%;
  align-items: center;
`;

const StyledTD = styled.div`
  width: ${(props) => props.width};
  padding: 5px;
`;

const TableTitle = styled(StyledTD)`
  display: flex;
  width: 100%;
`;

const StyledTR = styled.div`
  margin-top: 16px;
  width: 100%;
  background-color: #e2e2e2;
  height: 60px;
  align-items: center;
  display: flex;
`;

const TitleButtons = styled.div`
  margin-left: auto;
  margin-right: 24px;
  display: flex;
  gap: 24px;
`;

function Table(props) {
  const { column, data, area, tableTitle, titleButtons } = props;
  return (
    <TableContainer>
      <StyledTable>
        <StyledThead>
          {tableTitle && (
            <TableTitle>
              {tableTitle}
              <TitleButtons>
                {titleButtons && titleButtons.map((button) => button)}
              </TitleButtons>
            </TableTitle>
          )}
          {!tableTitle &&
            column.map((col, idx) => {
              return (
                <StyledTD width={area[col]} key={idx}>
                  {col}
                </StyledTD>
              );
            })}
        </StyledThead>
        {data.map((row, index) => (
          <StyledTR key={index}>
            {column.map((col, index) => (
              <StyledTD width={area[col]} key={index}>
                {row[col]}
              </StyledTD>
            ))}
          </StyledTR>
        ))}
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
