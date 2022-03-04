import React from "react";
import styled from "styled-components";
const Pagination = () => {
  return (
    <div>
      <PaginationUl>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </PaginationUl>
    </div>
  );
};
const PaginationUl = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
`;
export default Pagination;
