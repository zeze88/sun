import React from "react";
import styled from "styled-components";

const TabMenu = ({ menus }) => {
  const [menu, setMenu] = React.useState(menus[0]);
  console.log(menu);
  return (
    <SC_TabMenu>
      {menus.map((v, idx) => (
        <li
          key={idx}
          className={menu === v ? "active" : ""}
          onClick={() => {
            setMenu(v);
          }}>
          {v}
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
