import React from "react";
import styled from "styled-components";
import RoundTab from "../components/RoundTab";
import TableList from "../components/TableList";

const Arams = () => {
  const [curTab, setCurTab] = React.useState("total");
  return (
    <SC_AramsWrap>
      <h2>알림</h2>
      <RoundTab currTab={setCurTab} />
      <TableList currTab={curTab} />
    </SC_AramsWrap>
  );
};
const SC_AramsWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;

  h2 {
    padding: 0 24px;
    margin-top: 64px;
    margin-bottom: 115px;
  }
`;
export default Arams;
