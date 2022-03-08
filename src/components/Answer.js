import React from "react";
import styled from "styled-components";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImgUpload from "./ImgUpload";
import AnswerList from "../components/AnswerList";

import { actionCreators as answerActions } from "../redux/modules/answer";

const Answer = () => {
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
    console.log(addAnswer);
    dispatch(
      answerActions.addAnswerDB({ pid: params, uid: user_info, ...addAnswer })
    );
  };
  return (
    <SC_Answer>
      <input id="title" onChange={onChange} type="text" />
      <input id="comment" onChange={onChange} type="text" />
      <ImgUpload />
      <button onClick={answerSubmit}>답변 click</button>
      <AnswerList edit={addAnswer} />
    </SC_Answer>
  );
};
const SC_Answer = styled.div``;
export default Answer;
