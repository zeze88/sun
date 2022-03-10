import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";
import Comment from "./Comment";
import Answer from "./Answer";
import AnswerEdit from "./AnswerEdit";

const AnswerList = () => {
  const pid = useParams().pid;
  const dispatch = useDispatch();
  const user_info = sessionStorage.getItem("uid");
  const answer_list = useSelector((state) => state.answer.list);
  const [isEdit, setIsEdit] = React.useState();
  console.log(answer_list);
  React.useEffect(() => {
    dispatch(answerActions.getAnswerDB(pid));
    if (!answer_list) {
      return;
      dispatch(answerActions.getAnswerDB(pid));
    }
  }, []);

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
      {answer_list?.map((v, idx) => (
        <div key={idx} className='wrap'>
          <div className='header'>
            <h2>답변</h2>
          </div>
          <div>
            <div className='content_wrap'>
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
                  <button
                    onClick={() => {
                      setIsEdit(v.answerId);
                    }}>
                    수정
                  </button>
                </>
              )}

              <div>{v.answerTitle}</div>
              <div>{v.answerComment}</div>

              <div>
                {isEdit === v.answerId && <Answer isEdit={true} list={v} />}
              </div>
            </div>

            <Commentbox className='comment'>
              <Comment />
            </Commentbox>
            <div className='comment_wrap'>
              {v.commnetResponseDtoList.map((list, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <dl>
                      <dt>{list.userImage}</dt>
                      <dd>{list.nickname}</dd>
                    </dl>
                    <div>{list.comment}</div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
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
