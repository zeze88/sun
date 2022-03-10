import React from "react";
import styled from "styled-components";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImgUpload from "./ImgUpload";

import { actionCreators as answerActions } from "../redux/modules/answer";

const Answer = ({ isEdit = null, list = null }) => {
  const dispatch = useDispatch();
  const params = useParams().pid;
  const user_info = sessionStorage.getItem("uid");
  const [addAnswer, setAddAnswer] = React.useState("");

  const onChange = (e) => {
    const id = e.target.id;
    const content = e.target.value;
    setAddAnswer({ ...addAnswer, [id]: content });
  };

  const answerSubmit = () => {
    dispatch(
      answerActions.addAnswerDB({ pid: params, uid: user_info, ...addAnswer })
    );
  };

  const editAnswer = () => {
    dispatch(
      answerActions.editAnswerDB({ answsrId: list.answerId, ...addAnswer })
    );
  };

  if (isEdit) {
    return (
      <SC_Answer>
        <input
          id='title'
          onChange={onChange}
          type='text'
          placeholder={list.answerTitle}
        />
        <input
          id='comment'
          onChange={onChange}
          type='text'
          placeholder={list.answerComment}
        />
        <ImgUpload isEdit={isEdit} editImg={list.answerImg} />
        <button onClick={editAnswer}>수정 go</button>
      </SC_Answer>
    );
  }

  return (
    <SC_Answer>
      <input id='title' onChange={onChange} type='text' />
      <input id='comment' onChange={onChange} type='text' />
      <ImgUpload />
      <button onClick={answerSubmit}>답변 click</button>
    </SC_Answer>
  );
};
const SC_Answer = styled.div``;
export default Answer;
