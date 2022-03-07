import React from "react";
import styled from "styled-components";
const NoticeList = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((data, idx) => {
        console.log(data.createdAt);
        // const date = data.createdAt.split(".")[0].replace("T", " ");
        // console.log(date);
        return (
          <NoticeListDiv key={idx}>
            <div className="title">
              <dl>
                <dt>{data.postTitle}</dt>
                <dd>new</dd>
              </dl>
              <TagUl>
                {data.tag.map((v, idx) => (
                  <li key={idx}>{v}</li>
                ))}
              </TagUl>
            </div>
            <div className="content">
              <div>{data.postComment}</div>
            </div>
            <div className="info">
              <em>{data.createdAt}</em>
              <span>
                <img scr={data.img} /> {data.nickname}
              </span>
              <i>{data.postLikeCount}</i>
            </div>
          </NoticeListDiv>
        );
      })}
    </React.Fragment>
  );
};

const NoticeListDiv = styled.div`
  padding: 30px 20px;
  border-bottom: solid 1px #dadada;

  > div {
    display: flex;
    align-items: center;
  }
  .title {
    justify-content: space-between;
  }

  .info {
    justify-content: flex-end;
    text-align: right;
    color: #676767;
  }

  .content {
    align-items: flex-start;
    height: 50px;
    color: #343434;

    > div {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  dl {
    display: flex;
    align-items: center;
  }

  dt {
    font-weight: 700;
    color: #343434;
  }

  dd {
    display: inline-block;
    padding: 4px 6px;
    color: #fff;
    border-radius: 40px;
    background-color: #676767;
  }

  span {
    display: inline-flex;
    align-items: center;
  }

  em {
    margin-right: 10px;
    font-style: normal;
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
    padding: 4px 6px;
    margin-left: 10px;
    text-align: center;
    border-radius: 30px;
    color: #b9b9b9;
    border: solid 1px #b9b9b9;
    list-style: none;
  }
`;
export default NoticeList;
