import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";
import Comment from "./Comment";

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
    <SC_List>
      {answer_list.map((v, idx) => (
        <div key={idx} className="wrap">
          <div className="header">
            <h2>답변</h2>
          </div>
          <div>
            <div className="content_wrap">
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
            </div>
            <AnswerEdit isEdit={isEdit} list={v} />
            <div className="comment_wrap">
              <dl>
                <dt>imgurl response에 없어요.</dt>
                <dd>jjy nickname response에 없어요</dd>
              </dl>
              <div>{v.commnetResponseDtoList.commentTitle}</div>
              <div>{v.commnetResponseDtoList.comment}</div>
            </div>
          </div>
          <Commentbox className="comment">
            <Comment />
          </Commentbox>
        </div>
      ))}
    </SC_List>
  );
};

const SC_List = styled.div`
  h2 {
    margin: 0;
  }

  .wrap {
    margin: 30px 0;
    background-color: #f7f7f7;
  }

  .header {
    height: 50px;
    line-height: 50px;
    padding: 20px;
    border-bottom: solid 1px #ebebeb;
  }

  .content_wrap {
    padding: 30px;
  }

  .comment_wrap {
    padding: 30px;
    border-top: solid 1px #ebebeb;
  }
  dl {
    display: flex;
  }
  dt {
    display: block;
    width: 30px;
    height: 30px;
    background-color: #000;
    border-radius: 100%;
  }
`;
const Commentbox = styled.div`
  @media screen and (min-width: 1050px) {
    .comment {
      width: 50%;
    }
  }
`;

export default AnswerList;
