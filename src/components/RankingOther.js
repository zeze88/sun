import React from "react";
import styled from "styled-components";
import Profile from "../elements/Profile";

const RankingOther = ({ list, user_ranking }) => {
  const user_info = sessionStorage.getItem("uid");
  return (
    <SC_OtherRanking>
      <ul>
        {user_info && (
          <li className='my_ranking'>
            <i>{user_ranking.rank}</i>
            <Profile size={70} imgUrl={user_ranking.userImage} />
            <strong>{user_ranking.nickname}</strong>
            {user_ranking.point && <em>{user_ranking.point} 점</em>}
            {user_ranking.weekPoint && <em>{user_ranking.weekPoint} 점</em>}
            {user_ranking.monthPoint && <em>{user_ranking.monthPoint} 점</em>}
            {user_ranking.blogUrl && <button>SNS</button>}
          </li>
        )}
        {list.map((v, idx) => (
          <li key={idx}>
            <i>{idx + 4}</i>
            <Profile size={70} imgUrl={v.userImage} />
            <strong>{v.nickname}</strong>
            <em>{!v.point ? 0 : v.point} 점</em>
            <button>SNS</button>
          </li>
        ))}
      </ul>
    </SC_OtherRanking>
  );
};
const SC_OtherRanking = styled.div`
  --main-color: #7966ff;
  .my_ranking {
    background-color: #f9f8ff;
    color: var(--main-color);
    border-radius: 8px;
    border-bottom: none;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 30px;
    height: 96px;
    border-bottom: solid 1px #f0ecfd;

    & > *:not(style) {
      font-size: 16px;
      font-weight: 700;
    }
  }

  span {
    box-shadow: 0 0 10px 0 rgba(121, 102, 255, 0.2);
  }

  i {
    font-style: normal;
    padding: 10px;
  }

  strong {
    padding: 0 10px;
  }

  em {
    font-style: normal;
    width: 20%;
  }

  button {
    width: 103px;
    height: 36px;
    border-radius: 40px;
    font-size: 14px !important;
    margin-left: auto;
    color: #fff;
    background-color: var(--main-color);
  }
`;

export default RankingOther;
