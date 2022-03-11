import React from "react";
import styled from "styled-components";
import Profile from "../elements/Profile";

const RankingTop = ({ list }) => {
  return (
    <SC_TopRanking>
      <ul>
        {list.map((v, idx) => (
          <li key={idx} className={`ranking_${idx + 1}`}>
            <Profile size={idx === 0 ? 60 : 40} imgUrl={v.userImage} />
            <strong>
              {idx + 1}.{v.nickname}
            </strong>
            <em>{!v.point ? 0 : v.point}</em>
          </li>
        ))}
      </ul>
    </SC_TopRanking>
  );
};

const SC_TopRanking = styled.div`
  ul {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
  }
  em,
  strong {
    display: block;
  }
  li {
    &.ranking_2 {
      grid-row-start: 1;
      grid-column-start: 1;
    }
  }
`;
export default RankingTop;
