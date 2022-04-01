import React from "react";
import styled from "styled-components";
import RoundTab from "../components/RoundTab";
import TableList from "../components/TableList";

const Alarms = () => {
  const [curTab, setCurTab] = React.useState("total");

  return (
    <SC_AlarmsWrap>
      <h2>알람 내역</h2>
      <RoundTab currTab={setCurTab} />
      <TableList currTab={curTab} />
    </SC_AlarmsWrap>
  );
};

const SC_AlarmsWrap = styled.div`
  width: 1440px;
  min-height: calc(100vh - 100px - 150px);
  margin: 0 auto;

  h2 {
    padding: 30px 20px;
    font-size: 24px;
    font-weight: 700;
  }
`;
export default Alarms;
