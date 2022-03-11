import React from "react";
import styled from "styled-components";
import Profile from "../elements/Profile";

const RankingOther = ({ list }) => {
  console.log(list);
  return (
    <SC_OtherRanking>
      <ul>
        {list.map((v, idx) => (
          <li key={idx}>
            <i>{idx + 1}</i>
            <Profile size={40} imgUrl={v.userImage} />
            <strong>{v.nickname}</strong>
            <em>{!v.point ? 0 : v.point}</em>
          </li>
        ))}
      </ul>
    </SC_OtherRanking>
  );
};
const SC_OtherRanking = styled.div`
  ul {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
  }

  li {
    display: flex;
    align-items: center;
    padding: 10px 30px;
    background-color: #ebebeb;
  }

  i {
    padding: 10px;
  }

  strong {
    padding: 0 10px;
  }

  em {
    width: 20%;
    margin-left: auto;
  }
`;

export default RankingOther;
