import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Profile from "../elements/Profile";
import { useSelector } from "react-redux";

const RankingOther = ({ list, user_ranking }) => {
  const user_info = useSelector((state) => state.user.user.uid);

  return (
    <SC_OtherRanking>
      <ul>
        {user_info && (
          <li className='my_ranking'>
            <i>{user_ranking.rank}</i>
            <Profile size={56} imgUrl={user_ranking.userImage} />
            <strong>{user_ranking.nickname}</strong>
            {user_ranking.point >= 0&& <em>{user_ranking.point} 점</em>}
            {user_ranking.monthPoint >= 0&& <em>{user_ranking.monthPoint} 점</em>}
            {user_ranking.weekPoint>= 0 && <em>{user_ranking.weekPoint} 점</em>}
            {!user_ranking.blogUrl ||
            user_ranking.blogUrl === "undefined" ||
            user_ranking.blogUrl === "null" ? (
              <button
                onClick={() => {
                  Swal.fire("", "연결 된 sns가 없습니다 :)", "error");
                }}>
                SNS
              </button>
            ) : (
              <a href={user_ranking.blogUrl} target='_blank'>
                <button> SNS</button>
              </a>
            )}
          </li>
        )}
        {list.map((v, idx) => (
          <li key={idx}>
            <i>{idx + 4}</i>
            <Profile size={56} imgUrl={v.userImage} />
            <strong>{v.nickname}</strong>
              {v.point >= 0 && <em>{v.point}점</em>}
              {v.monthPoint >= 0 && <em>{v.monthPoint}점</em>}
              {v.weekPoint >= 0 && <em>{v.weekPoint }점</em>}
            {!v.blogUrl || v.blogUrl === "unll" || v.blogUrl === "undefined" ? (
              <button
                onClick={() => {
                  Swal.fire("", "연결 된 sns가 없습니다 :)", "error");
                }}>
                SNS
              </button>
            ) : (
              <a href={v.blogUrl} target='_blank'>
                <button> SNS</button>
              </a>
            )}
          </li>
        ))}
      </ul>
    </SC_OtherRanking>
  );
};
const SC_OtherRanking = styled.div`
  --main-color: #7966ff;
  .my_ranking {
    margin: 0 ;
    padding: 0 30px;
    background-color: #f9f8ff;
    color: var(--main-color);
    border-radius: 8px;
    border-bottom: none;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0 30px;
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
    width: 60px;
    font-style: normal;
    padding: 6px;
  }

  strong {
    display: block;
    width: 177px;
    margin-left: 17px;
    margin-right: 72px;
  }

  em {
    font-style: normal;
    width: 20%;
  }

  a {
    margin-left: auto;
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
