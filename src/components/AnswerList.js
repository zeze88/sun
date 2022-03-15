import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";
import Comment from "./Comment";
import Answer from "./Answer";
import Profile from "../elements/Profile";

const AnswerList = () => {
  const pid = useParams().pid;
  const dispatch = useDispatch();
  const list = useSelector((state) => state.answer.list);
  const user_info = sessionStorage.getItem("uid");
  const [isEdit, setIsEdit] = React.useState(null);

  React.useEffect(() => {
    if (list.length <= 1) {
      return;
    }
    dispatch(answerActions.getAnswerDB(pid));
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
      {!list
        ? ""
        : list.map((v, idx) => {
            return (
              <div key={idx}>
                <div className='answer_wrap'>
                  <div className='header'>
                    <h2>답변</h2>
                  </div>
                  <div className='content'>
                    <div>{v.answerTitle}</div>
                    <p>{v.answerComment}</p>
                    <div>
                      <img src={v.answerImg} />
                    </div>
                  </div>

                  <div className='btn_wrap'>
                    {Number(user_info) && v.uid === Number(user_info) ? (
                      <>
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
                    ) : (
                      <button
                        onClick={() => {
                          chooseAnswer(v.uid, v.answerId);
                        }}>
                        채택
                      </button>
                    )}
                  </div>
                  {isEdit === v.answerId && <Answer isEdit={true} list={v} />}
                </div>

                <div>
                  <SC_Commentbox className='comment'>
                    <Comment />
                  </SC_Commentbox>
                  <SC_CommentList className='comment_wrap'>
                    <p>답변 감사합니다!!!!!</p>
                    <div>
                      <Profile size={24} />
                      <strong>jjy</strong>
                      <em>2020-02-02</em>
                    </div>
                    {v.commnetResponseDtoList.map((list, idx) => {
                      return (
                        <div key={idx}>
                          <dl>
                            <dt>
                              <Profile size={24} imgUrl={list.userImage} />
                            </dt>
                            <dd>{list.nickname}</dd>
                          </dl>
                          <em></em>
                        </div>
                      );
                    })}
                  </SC_CommentList>
                </div>
              </div>
            );
          })}
    </SC_List>
  );
};

const SC_List = styled.div`
  h2 {
    margin: 0;
  }

  .answer_wrap {
    border-bottom: solid 1px #ebebeb;
  }

  .header {
    display: flex;
    padding: 24px;

    button {
      margin-left: auto;
    }
  }

  .content {
    padding: 0 24px;

    > div {
      font-size: 20px;
      font-weight: 700;
    }

    > *:not(style) {
      margin-bottom: 10px;
    }
  }

  .btn_wrap {
    display: flex;
    justify-content: flex-end;
    padding: 24px;

    button {
      padding: 10px 32px;
      color: #7966ff;
      font-size: 16px;
    }
  }
`;

const SC_Commentbox = styled.div`
  padding: 24px;
`;

const SC_CommentList = styled.div`
  --gray-color: #c4c4c4;
  display: flex;
  align-items: flex-end;
  padding: 18px 24px;
  border-bottom: solid 1px #dadada;

  &:last-child {
    border-bottom: none;
  }

  p {
    flex: auto;
  }

  div {
    flex: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: var(--gray-color);
  }
  strong {
    font-weight: normal;
    margin-left: 8px;
  }

  em {
    font-style: normal;
    padding-left: 16px;
    margin-left: 16px;
    border-left: solid 1px var(--gray-color);
  }
`;

export default AnswerList;
