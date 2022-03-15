import React from "react";
import styled from "styled-components";

const TabMenu = ({ tab_list, tab }) => {
  const [menu, setMenu] = React.useState(tab_list[0].title);

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
    margin-right: 50px;
    padding-bottom: 9px;

    &.active {
      color: #343434;
      border-bottom: solid 3px #676767;
    }
  }
`;
export default TabMenu;
