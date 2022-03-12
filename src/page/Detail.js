import React from "react";
import styled from "styled-components";
import Comment from "../components/Comment";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as answerActions } from "../redux/modules/answer";
import { actionsCreators as searchActions } from "../redux/modules/serch";

import { history } from "../redux/configureStore";
import Answer from "../components/Answer";
import AnswerList from "../components/AnswerList";
import Profile from "../elements/Profile";
import user from "../redux/modules/user";

const Detail = () => {
  const dispatch = useDispatch();
  const pid = useParams().pid;
  const post_one = useSelector((state) => state.post.list);
  const user_info = sessionStorage.getItem("uid");

  const delPost = () => {
    dispatch(postActions.delPostDB(pid));
  };

  const likebtn = () => {
    if (!user_info) {
      alert("로그인 후 이용해주세요");
    } else {
      dispatch(postActions.postLikeDB(user_info, pid));
    }
  };

  React.useEffect(() => {
    dispatch(answerActions.getAnswerDB(pid));
    dispatch(postActions.getOnePostDB(pid));
  }, []);
  // const date = post_one.createdAt?.split(".")[0].split("T").join(" ");
  const date = post_one.createdAt?.split("T")[0];

  return (
    <Container>
      <Question>
        <Top>
          <div className='header'>
            <h3>{post_one.postTitle}</h3>
            <ul>
              {post_one.tag?.map((v, idx) => (
                <li
                  key={idx}
                  style={{ minWidth: "2rem", border: "1px solid " }}
                  onClick={() => {
                    history.push(`/search/tag_${v}`);
                  }}>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className='top_info'>
            <dl className='user_info'>
              <dt>
                <Profile />
              </dt>
              <dd>{post_one.nickname}</dd>
            </dl>
            <em>{date}</em>
          </div>
        </Top>
        <ContextWrap>
          <div className='text-wrap'>
            <p>{post_one.postComment}</p>
            <img src={post_one.postImg} />
          </div>

          <div className='btn_wrap'>
            <button onClick={likebtn}>관심 {post_one.postLikeCount}</button>
            {Number(user_info) === post_one.uid && (
              <>
                <button styled={{ fontSize: "40px" }} onClick={delPost}>
                  삭제
                </button>
                <button
                  styled={{ fontSize: "40px" }}
                  onClick={() => {
                    history.push(`/edit/${pid}`);
                  }}>
                  수정
                </button>
              </>
            )}
            {user_info === post_one.uid && (
              <>
                <button styled={{ fontSize: "40px" }} onClick={delPost}>
                  삭제
                </button>
                <button
                  styled={{ fontSize: "40px" }}
                  onClick={() => {
                    history.push(`/edit/${pid}`);
                  }}>
                  수정
                </button>
              </>
            )}
          </div>
        </ContextWrap>
      </Question>
      <Answer />
      <AnswerList />

      {/* <Commentbox className="comment">
        <Comment />
      </Commentbox> */}
    </Container>
  );
};

const Container = styled.div``;

const Question = styled.div`
  border-bottom: solid 1px #ebebeb;
`;

const Top = styled.div`
  padding: 10px;
  border-bottom: solid 1px #ebebeb;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul {
    display: flex;
  }

  li {
    margin-left: 10px;
    padding: 4px 10px;
    border-radius: 20px;
  }
  .header {
    padding: 30px 0;
  }

  .user_info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ContextWrap = styled.div`
  padding: 10px;
  .text-wrap {
    min-height: 250px;
  }
  .btn_wrap {
    text-align: right;
    button {
      margin-left: 10px;
      border-radius: 5px;
      background-color: #676767;
    }
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 21rem;
`;
const Content = styled.div`
  width: 95%;
  height: 95%;
  margin: auto;
`;

const Commentbox = styled.div`
  @media screen and (min-width: 1050px) {
    .comment {
      width: 50%;
    }
  }
`;

export default Detail;
