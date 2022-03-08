import React from "react";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";
import Answer from "./Answer";
import AnswerEdit from "./AnswerEdit";

const AnswerList = ({ edit }) => {
  const pid = useParams().pid;
  const dispatch = useDispatch();
  const user_info = sessionStorage.getItem("uid");
  const answer_list = useSelector((state) => state.answer.list);
  const [isEdit, setIsEdit] = React.useState(false);

  React.useEffect(() => {
    dispatch(answerActions.getAnswerDB(pid));
  }, []);

  const editAnswer = () => {
    dispatch(answerActions.editAnswerDB({ ...edit }));
  };

  const chooseAnswer = (uid, answrId) => {
    dispatch(
      answerActions.chooseAnswerDB({
        uid: user_info,
        pid,
        answrId: answrId,
        answerUid: uid,
      })
    );
  };

  const deleAnswer = (answerId) => {
    dispatch(answerActions.delAnswerDB(answerId));
  };
  return (
    <div>
      {answer_list.map((v, idx) => (
        <div key={idx}>
          {v.uid === Number(user_info) && (
            <>
              <button
                onClick={() => {
                  chooseAnswer(v.uid, v.answerId);
                }}>
                채택
              </button>
              <button
                onClick={() => {
                  deleAnswer(v.answerId);
                }}>
                삭제
              </button>
            </>
          )}
          <div>{v.answerTitle}</div>
          <div>{v.answerComment}</div>
          <AnswerEdit isEdit={isEdit} list={v} />
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
