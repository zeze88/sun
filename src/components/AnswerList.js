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
  const [answerInfo, setAnswerInfo] = React.useState([]);

  React.useEffect(() => {
    dispatch(answerActions.getAnswerDB(pid));
  }, []);

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

  const deleAnswer = (answerId) => {
    dispatch(answerActions.delAnswerDB(answerId));
  };
  return (
    <div>
      {answer_list.map((v, idx) => {
        return (
          <div key={idx}>
            {v.uid === Number(user_info) && (
              <>
                <button onClick={editAnswer}>수정</button>
                <button onClick={chooseAnswer}>채택</button>
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
        );
      })}
    </div>
  );
};

export default AnswerList;
