import React from "react";
import styled from "styled-components";

const RoundBtn = ({ onClick, title }) => {
  return <Button onClick={onClick}>{title}</Button>;
};

const Button = styled.button`
  line-height: 30px;
  flex: none;
  padding: 0 32px;
  color: #fff;
  font-size: 16px;
  border-radius: 32px;
  background-color: #7966ff;
`;

export default RoundBtn;
