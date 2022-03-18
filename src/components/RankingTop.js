import React from "react";
import styled from "styled-components";
import Profile from "../elements/Profile";
import { Link } from "react-router-dom";

const url = sessionStorage.getItem("url");

const RankingTop = ({ list }) => {
  console.log(url);
  return (
    <SC_TopRanking>
      <ul>
        {list.map((v, idx) => {
          const index = (idx) => {
            switch (idx) {
              case 0:
                return "1st";
              case 1:
                return "2nd";
              case 2:
                return "3rd";
            }
          };
          return (
            <li key={idx} className={`ranking_${idx + 1}`}>
              <Profile size={idx === 0 ? 140 : 104} imgUrl={v.userImage} />
              <strong>{v.nickname}</strong>
              <em>{!v.point ? 0 : v.point} 점</em>
              <Link to='{url}'>
                <button> SNS</button>
              </Link>
              <i>{index(idx)}</i>
            </li>
          );
        })}
      </ul>
    </SC_TopRanking>
  );
};

const SC_TopRanking = styled.div`
  --main-color: #7966ff;

  padding-top: 60px;
  padding-bottom: 62px;

  ul {
    display: grid;
    align-items: end;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 112px;
    width: fit-content;
    margin: 0 auto;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;

    &.ranking_2 {
      grid-row-start: 1;
      grid-column-start: 1;
    }
  }

  span {
    box-shadow: 0 0 10px 0 rgba(121, 102, 255, 0.2);
  }

  strong {
    margin-top: 10px;
    margin-bottom: 12px;
    font-size: 18px;
  }

  em,
  i {
    font-weight: 700;
    font-style: normal;
  }

  button {
    width: 103px;
    height: 36px;
    margin-top: 8px;
    margin-bottom: 12px;
    color: #fff;
    border-radius: 40px;
    background-color: var(--main-color);
  }

  i {
    color: var(--main-color);
    font-size: 20px;
  }
`;
export default RankingTop;
