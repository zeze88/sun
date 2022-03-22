import React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import { history } from "../redux/configureStore";

const NoticeList = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((data, idx) => {
        // const date = data.createdAt?.split(".")[0].replace("T", " ");
        const date = data.createdAt?.split("T")[0];

        return (
          <NoticeListDiv
            key={idx}
            onClick={() => {
              history.push(`/detail/${data.pid}`);
            }}>
            {data.category && <div className='category'>{data.category}</div>}
            <div className='title'>
              <h3>{data.postTitle}</h3>
              {data.status === "selection" && <em>답변완료</em>}
            </div>
            <div className='content'>
              <div>{data.postComment}</div>
            </div>
            <div className='info'>
              <TagUl>
                {data.tag?.map((v, idx) => (
                  <li key={idx}>#{v} </li>
                ))}
              </TagUl>
              <span>
                <Profile imgUrl={data.userImage} size='24' />
                {data.nickname}
              </span>
              <em>{date}</em>
              <i>관심 {data.postLikeCount}</i>
            </div>
          </NoticeListDiv>
        );
      })}
    </React.Fragment>
  );
};

const NoticeListDiv = styled.div`
  padding: 22px 0 26px;
  border-bottom: solid 1px #dadada;
  margin: 0 24px;

  .category {
    display: inline-block;
    padding: 8px 14px;
    margin-bottom: 14px;
    text-align: center;
    border-radius: 30px;
    color: #5e45f2;
    font-size: 12px;
    border: solid 1px #5e45f2;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;

    em {
      flex: none;
      display: inline-block;
      padding: 4px 6px;
      color: #5e45f2;
      border-radius: 2px;
      background-color: #f0ecfd;
      font-style: normal;
    }
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content {
    align-items: flex-start;
    height: 56px;
    margin-bottom: 28px;

    > div {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .info {
    display: flex;
    align-items: center;
    text-align: right;
    color: #333;

    span {
      margin-left: auto;
      display: inline-flex;
      align-items: center;

      span {
        margin-right: 6px;
      }
    }

    em {
      padding: 0 18px;
      margin: 0 18px;
      font-style: normal;
      border: solid 1px #333;
      border-top: none;
      border-bottom: none;
    }
  }

  i {
    font-style: normal;
  }
`;

const TagUl = styled.div`
  display: inline-flex;

  li {
    color: #797979;
    font-size: 12px;
    margin-right: 10px;
  }
`;
export default NoticeList;
