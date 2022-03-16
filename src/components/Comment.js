import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import answer from "../redux/modules/answer";
import RoundBtn from "../elements/RoundBtn";
import { useParams } from "react-router-dom";

const Comment = ({ list }) => {
  const dispatch = useDispatch();
  const pid = useParams().pid;
  const uid = sessionStorage.getItem("uid");
  const answerId = list.answerId;
  const [comment, setComment] = React.useState("");
  const C = Object.keys(list.commnetResponseDtoList).length;
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
  };

  return (
    <Container>
      <CommentCount>댓글 {C}</CommentCount>
      <CommentInput>
        <CommentWrite onChange={onChange} />
        <RoundBtn onClick={addComment} title='등록' />
      </CommentInput>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const CommentCount = styled.div`
  flex: none;
  font-weight: 700;
  margin-right: 22px;
`;

const CommentInput = styled.div`
  flex: auto;
  display: flex;
  align-items: flex-end;
  height: 80px;
  padding: 14px;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  overflow: hidden;
`;

const CommentWrite = styled.textarea`
  flex: auto;
  height: 100%;
  padding: 14px;
`;

const Buttom = styled.button`
  flex: none;
  padding: 10px 32px;
  margin-left: 10px;
  color: #fff;
  font-size: 16px;
  border-radius: 30px;
  background-color: #7966ff;
`;

export default Comment;
