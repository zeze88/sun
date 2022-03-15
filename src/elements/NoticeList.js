import React from "react";
import styled from "styled-components";

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
            <div className='title'>
              <h3>{data.postTitle}</h3>
              {data.status === "selection" && <em>답변완료</em>}
              {data.category && <div className='category'>{data.category}</div>}
            </div>
            <div className='content'>
              <div>{data.postComment}</div>
            </div>
            <div className='info'>
              <TagUl>
                {data.tag.map((v, idx) => (
                  <li key={idx}>#{v} </li>
                ))}
              </TagUl>
              <span>
                <img scr={data.img} /> {data.nickname}
              </span>
              <em>{date}</em>
              <i>{data.postLikeCount}</i>
            </div>
          </NoticeListDiv>
        );
      })}
    </React.Fragment>
  );
};

const NoticeListDiv = styled.div`
  padding: 24px 0;
  border-bottom: solid 1px #dadada;
  margin: 0 24px;

  > div {
    flex: auto;
    display: flex;
    align-items: center;
  }

  .title {
    gap: 10px;
    margin-bottom: 20px;

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
    margin-right: auto;
    font-weight: 700;
    color: #333;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info {
    text-align: right;
    color: #333;
    span {
      margin-left: auto;
    }
    em {
      padding: 0 10px;
      margin: 0 10px;
      font-style: normal;
      border: solid 1px #333;
      border-top: none;
      border-bottom: none;
    }
  }

  .content {
    align-items: flex-start;
    height: 56px;
    margin-bottom: 28px;
    color: #343434;

    > div {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .category {
    padding: 4px 6px;
    text-align: center;
    border-radius: 30px;
    color: #5e45f2;
    border: solid 1px #5e45f2;
  }

  span {
    display: inline-flex;
    align-items: center;
  }

  i {
    font-style: normal;
  }

  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 4px;
    border-radius: 20px;
    border: solid 1px #fff;
    background-color: #d6d6d6;
  }
`;

const TagUl = styled.div`
  display: inline-flex;

  li {
    color: #797979;
    margin-right: 10px;
  }
`;
export default NoticeList;
