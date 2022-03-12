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
  const nickname = sessionStorage.getItem("nickname");
  const [addAnswer, setAddAnswer] = React.useState(
    isEdit ? list : { answerTitle: "", answerComment: "" }
  );
  const { answerTitle, answerComment } = addAnswer;

  const onChange = (e) => {
    const id = e.target.id;
    const content = e.target.value;
    console.log(content);

    setAddAnswer({ ...addAnswer, [id]: content });
  };

  const answerSubmit = () => {
    dispatch(
      answerActions.addAnswerDB({ pid: params, uid: user_info, ...addAnswer })
    );
    setAddAnswer({ answerTitle: "", answerComment: "" });
  };

  const editAnswer = () => {
    dispatch(
      answerActions.editAnswerDB({
        ...addAnswer,
        answsrId: list.answerId,
        pid: params,
        uid: nickname,
      })
    );
  };

  if (isEdit) {
    return (
      <SC_Answer>
        <input
          id='answerTitle'
          onChange={onChange}
          type='text'
          value={answerTitle}
          // placeholder={list.answerTitle}
        />
        <input
          id='answerComment'
          onChange={onChange}
          type='text'
          value={answerComment}
          // placeholder={list.answerComment}
        />
        <ImgUpload isEdit={isEdit} editImg={list.answerImg} />
        <button onClick={editAnswer}>수정 go</button>
      </SC_Answer>
    );
  }

  return (
    <SC_Answer>
      <input
        id='answerTitle'
        value={answerTitle}
        onChange={onChange}
        type='text'
      />
      <input
        id='answerComment'
        value={answerComment}
        onChange={onChange}
        type='text'
      />
      <ImgUpload cleanImg={addAnswer.answerTitle} />
      <button onClick={answerSubmit}>답변 click</button>
    </SC_Answer>
  );
};
const SC_Answer = styled.div`
  padding: 30px;
`;
export default Answer;
