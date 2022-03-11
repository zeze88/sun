import React from "react";
import styled from "styled-components";

const TabMenu = ({ tab }) => {
  const tab_list = [
    {
      title: "nockeck",
      value: "답변대기",
    },
    {
      title: "check",
      value: "답변완료",
    },
  ];

  const [menu, setMenu] = React.useState("nockeck");

  return (
    <SC_TabMenu>
      {tab_list.map((v, idx) => (
        <li
          key={idx}
          className={menu === v.title ? "active" : ""}
          onClick={() => {
            setMenu(v.title);
            tab(v.title);
          }}>
          {v.value}
        </li>
      ))}
    </SC_TabMenu>
  );
};
const SC_TabMenu = styled.ul`
  display: inline-flex;

  li {
    list-style: none;
    color: #7e7e7e;
    cursor: pointer;

    &.active {
      color: #343434;
      border-bottom: solid 3px #343434;
    }
  }
`;
export default TabMenu;
