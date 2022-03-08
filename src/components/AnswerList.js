import React from "react";
import { useParams } from "react-router";

import { useDispatch } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";

const AnswerList = ({ edit }) => {
  const [answerInfo, setAnswerInfo] = React.useState([]);
  const dispatch = useDispatch();
  const pid = useParams().pid;
  const user_info = sessionStorage.getItem("uid");

  React.useEffect(() => {
    dispatch(answerActions.getAnswerDB());
    setAnswerInfo({
      uid: user_info,
      pid: pid,
      answrId: 2,
      answerUid: user_info,
      answerTitle: "dd",
      answerComment: "dd",
      answerImg: "img",
    });
  }, []);
  console.log(answerInfo);
  const editAnswer = () => {
    dispatch(answerActions.editAnswerDB({ ...edit }));
  };

  const chooseAnswer = () => {
    const answrId = answerInfo.answrId;
    const answerUid = answerInfo.answerUid;
    dispatch(
      answerActions.chooseAnswerDB({ uid: user_info, pid, answrId, answerUid })
    );
  };
  const deleAnswer = () => {
    dispatch(answerActions.delAnswerDB(answerInfo));
  };
  return (
    <div>
      <button onClick={editAnswer}>수정</button>
      <button onClick={chooseAnswer}>채택</button>
      <button onClick={deleAnswer}>삭제</button>
      <div>title</div>
      <div>content</div>
    </div>
  );
};

export default AnswerList;
