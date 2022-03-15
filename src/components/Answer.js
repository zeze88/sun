import React from "react";
import styled from "styled-components";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImgUpload from "./ImgUpload";

import { actionCreators as answerActions } from "../redux/modules/answer";
import RoundBtn from "../elements/RoundBtn";

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
        <SC_InputWrap>
          <input
            id='answerTitle'
            onChange={onChange}
            type='text'
            value={answerTitle}
            // placeholder={list.answerTitle}
          />
          <textarea
            id='answerComment'
            onChange={onChange}
            type='text'
            value={answerComment}
            // placeholder={list.answerComment}
          ></textarea>
          <RoundBtn onClick={editAnswer} title='수정' />
        </SC_InputWrap>
        <ImgUpload isEdit={isEdit} editImg={list.answerImg} />
      </SC_Answer>
    );
  }

  return (
    <SC_Answer>
      <SC_InputWrap>
        <input
          id='answerTitle'
          value={answerTitle}
          onChange={onChange}
          type='text'
          placeholder='답변 제목 입력 해주세요'
        />
        <textarea
          id='answerComment'
          value={answerComment}
          onChange={onChange}
          type='text'
          placeholder='답변을 입력 해주세요'></textarea>
        <RoundBtn onClick={answerSubmit} title='등록' />
      </SC_InputWrap>
      <ImgUpload cleanImg={addAnswer.answerTitle} />
    </SC_Answer>
  );
};

const SC_InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-top: solid 1px #f7f7f7;

  input {
    padding: 0;
    display: block;
    font-size: 20px;
  }

  textarea {
    width: 100%;
    height: 130px;
    padding: 24px 0;
  }

  button {
    margin-left: auto;
  }
`;

const SC_Answer = styled.div`
  border-bottom: solid 8px #f7f7f7;
`;
export default Answer;
