import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

const NoticeList = ({ list }) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const post_nocheck = useSelector((state) => state.post.nockeckList);
  const postList = list === "check" ? post_list : post_nocheck;

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
    dispatch(postActions.getPostNocheckDB());
  }, []);

  return (
    <React.Fragment>
      {postList.map((data, idx) => {
        // const date = data.createdAt?.split(".")[0].replace("T", " ");
        const date = data.createdAt?.split("T")[0];

        return (
          <NoticeListDiv
            key={idx}
            onClick={() => {
              history.push(`/detail/${data.pid}`);
            }}>
            <div className='title'>
              <dl>
                <dt>{data.postTitle}</dt>
                {data.status === "selection" && <dd>답변완료</dd>}
              </dl>
              <TagUl>
                {data.tag.map((v, idx) => (
                  <li key={idx}>{v}</li>
                ))}
              </TagUl>
            </div>
            <div className='content'>
              <div>{data.postComment}</div>
            </div>
            <div className='info'>
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
  padding: 30px 20px;
  border-bottom: solid 1px #dadada;

  > div {
    display: flex;
    align-items: center;
  }
  .title {
    justify-content: space-between;
    margin-bottom: 10px;
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
    margin-right: 10px;
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
    padding: 0 10px;
    margin: 0 10px;
    font-style: normal;
    border: solid 1px #222;
    border-top: none;
    border-bottom: none;
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
