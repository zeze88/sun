import React from "react";
import styled from "styled-components";
import Comment from "../components/Comment";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import Answer from "../components/Answer";
import AnswerList from "../components/AnswerList";
const Detail = () => {
  const pid = useParams().pid;
  const post_one = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const user_info = sessionStorage.getItem("uid");
  const delPost = () => {
    dispatch(postActions.delPostDB(pid));
  };

  const likebtn = () => {
    dispatch(postActions.postLikeDB(user_info, pid));
  };

  React.useEffect(() => {
    dispatch(postActions.getOnePostDB(pid));
  }, []);

  return (
    <Container>
      <button onClick={likebtn}>관심</button>
      {user_info === post_one.uid && ""}
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
      <Question>
        <Top>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <div style={{ fontSize: "2rem", fontWeight: "700" }}>
              {post_one.postTitle}
            </div>
            <div style={{ textAlign: "right", marginRight: "2rem" }}>
              <div>💻 Img</div>
              화면공유
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem 2rem 0px 0px",
            }}>
            <span>조회수 작성일</span>
            {post_one.tag?.map((v, idx) => (
              <div key={idx} style={{ minWidth: "2rem", border: "1px solid " }}>
                {v}
              </div>
            ))}
          </div>
        </Top>
        <Line />
        <img src={post_one.postImg} />
        <ContentBox>
          <Content> {post_one.postComment}</Content>
        </ContentBox>
      </Question>
      <Answer />
      <AnswerList />

      <Commentbox className="comment">
        <Comment />
      </Commentbox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 1050px;
  padding: 2rem 1.5rem;
`;

const Question = styled.div`
  width: 70%;
  height: 100%;
  min-height: 500px;
  border-radius: 1rem;
  background-color: #d3d3d3;
`;

const Top = styled.div`
  width: 100%;
  height: 16%;
  padding: 1rem;
`;

const Line = styled.hr`
  color: #d3d3d3;
  border-width: 1px;
  width: 98.8%;
  margin-bottom: 2rem;
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
