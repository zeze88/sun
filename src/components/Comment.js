import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import answer from "../redux/modules/answer";
import { useParams } from "react-router-dom";

const Comment = () => {
  const dispatch = useDispatch();
  const pid = useParams().pid;
  const uid = sessionStorage.getItem("uid");
  const state = useSelector((state) => state);
  const answerId = "1";
  const [comment, setComment] = React.useState("");
  // console.log(uid);
  // console.log(state.answer);
  // console.log(pid);

  // React.useEffect(() => {
  //     dispatch()
  // })

  const addComment = () => {
    dispatch(commentActions.addCommentDB(uid, pid, answerId, comment));
  };

  const onChange = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  return (
    <Container>
      <CommentCount>댓글 0 개</CommentCount>
      <CommentInput>
        <CommentWrite onChange={onChange} />
      </CommentInput>
      <Buttom onClick={addComment}>입력하기</Buttom>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  height: 8rem;
  background-color: #d3d3d3;
  border-radius: 1rem;
  display: flex;
  margin-top: 2rem;
`;

const CommentCount = styled.div`
  width: 4rem;
  padding: 1rem 0px 0px 2rem;
`;

const CommentInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const CommentWrite = styled.input`
  width: 95%;
  height: 50%;
  border: 0px solid black;
  border-radius: 1rem;
`;

const Buttom = styled.button`
  width: 5rem;
  height: 1.5rem;
  position: absolute;
  font-size: 1rem;
  color: black;
  text-align: center;
  padding: 0px;
  border-radius: 1rem;
  margin: 4% 0px 0px 62%;
  background-color: #676767;
  cursor: pointer;
`;

export default Comment;
