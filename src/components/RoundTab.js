import { map } from "bluebird";
import React from "react";
import styled from "styled-components";
const RoundTab = ({ currTab }) => {
  const tab_list = [
    {
      title: "total",
      value: "전체",
    },
    {
      title: "answer",
      value: "답변",
    },
    {
      title: "post",
      value: "작성글",
    },
  ];

  const [tab, setTab] = React.useState("total");

  return (
    <RoundTabUl>
      {tab_list.map((v, idx) => (
        <li
          key={idx}
          className={tab === v.title ? "active" : ""}
          onClick={() => {
            setTab(v.title);
            currTab(v.title);
          }}>
          {v.value}
        </li>
      ))}
    </RoundTabUl>
  );
};
const RoundTabUl = styled.ul`
  display: flex;

  li {
    padding: 4px 10px;
    border: solid 1px #ebebeb;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      color: #fff;
      background-color: #797979;
    }
  }
`;
export default RoundTab;
