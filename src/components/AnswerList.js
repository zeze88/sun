import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";
import { actionCreators as commentActions } from "../redux/modules/comment";
import Comment from "./Comment";
import Answer from "./Answer";
import Profile from "../elements/Profile";
import Swal from "sweetalert2";

const AnswerList = ({ isWriter }) => {
  const pid = useParams().pid;
  const dispatch = useDispatch();
  const list = useSelector((state) => state.answer.list);
  const user_info = sessionStorage.getItem("uid");
  const userImage = sessionStorage.getItem("userImage");
  const [isEdit, setIsEdit] = React.useState(null);
  const [isCommentEdit, setIsCommentEdit] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [commentId, setCommentId] = React.useState(0);
  const isChoose = list?.find((v) => v.status === "true");

  console.log(list);

  React.useEffect(() => {
    if (list.length <= 1) {
      return;
    }
    dispatch(answerActions.getAnswerDB(pid));
  }, []);

  const chooseAnswer = (choose_list) => {
    //답변이 채택되었습니다 :) =>
    //답변이 채택이 취소되었습니다 :)
    //이미 채택된 답변이 존재합니다 :)

    // list.filter((v) => v.status == "true" && setThisAnswer(true));
    // console.log(thisAnswer);
    // console.log(list);

    if (!isChoose) {
      Swal.fire({
        title: "답변을 채택하시겠습니까?",
        text: "한번 채택한 답변은 취소 할 수 없습니다",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네 채택하겠습니다.",
        confirmButtonColor: "#7966FF",
        cancelButtonText: "아니오",
        cancelTextColor: "#7966FF",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("", "답변이 채택 되었습니다.", "success");
          dispatch(
            answerActions.chooseAnswerDB({
              ...choose_list,
              uid: user_info,
              answerUid: choose_list.uid,
            })
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("", "채택이 취소 되었습니다 :)", "error");
        }
      });
    } else {
      Swal.fire({
        title: "",
        text: "채택 된 답변이 존재합니다. :)",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#7966FF",
      });
    }
  };

  const deleAnswer = (answerId) => {
    dispatch(answerActions.delAnswerDB(answerId));
  };

  const setCommentEdit = (commentId) => {
    setCommentId(commentId);
  };

  const commentChange = (e) => {
    setComment(e.target.value);
  };

  const commentEdit = (e) => {
    const commentEditId = e.target.value;
    Swal.fire({
      title: "댓글을 수정하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#7966FF",
      cancelButtonText: "아니오",
      cancelTextColor: "#7966FF",
      Buttons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(commentActions.editCommentDB(commentEditId, comment));
      } else {
        return;
      }
    });
  };

  const commentDelete = (e) => {
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#7966FF",
      cancelButtonText: "아니오",
      cancelTextColor: "#7966FF",
      Buttons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(commentActions.deleteCommentDB(e.target.value));
      } else {
        return;
      }
    });
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
                    <Profile size='24' imgUrl={v.userImage} />
                    <span>{v.nickname}</span>
                    {/* 추후 아이콘으로 변경하겠습니다! */}
                    {v.status === "true" && (
                      <i style={{ color: "red", fontSize: "30px" }}>채택</i>
                    )}
                  </div>
                  <div className='content'>
                    <div>{v.answerTitle}</div>
                    <p>{v.answerComment}</p>
                    <div>
                      <img src={v.answerImg} />
                    </div>
                  </div>

                  <div className='btn_wrap'>
                    {Number(user_info) === Number(v.uid) && (
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
                    )}
                    {Number(user_info) === Number(isWriter) &&
                      Number(isWriter) !== Number(v.uid) && (
                        <button
                          onClick={() => {
                            chooseAnswer(v);
                          }}>
                          채택
                        </button>
                      )}
                  </div>
                  {isEdit === v.answerId && <Answer isEdit={true} list={v} />}
                </div>
                <div>
                  <SC_Commentbox className='comment'>
                    <Comment list={v} />
                  </SC_Commentbox>
                  <SC_CommentList className='comment_wrap'>
                    {v.commnetResponseDtoList.map((list, idx) => {
                      return (
                        <div key={idx}>
                          {list.uid == user_info ? (
                            <>
                              {isCommentEdit && list.commentId === commentId ? (
                                <div>
                                  <div className='mycomment'>
                                    <div>
                                      <Profile
                                        size={24}
                                        imgUrl={list.userImage}
                                      />
                                      <strong>{list.nickname}</strong>
                                    </div>
                                    <div className='button'>
                                      <button
                                        className='comment'
                                        onClick={commentEdit}
                                        value={list.commentId}>
                                        수정완료
                                      </button>
                                    </div>
                                  </div>
                                  <p>
                                    <textarea
                                      defaultValue={list.comment}
                                      type='text'
                                      onChange={commentChange}></textarea>
                                  </p>
                                  <p> {list.createdAt?.split("T")[0]}</p>
                                </div>
                              ) : (
                                <div>
                                  <div className='mycomment'>
                                    <div>
                                      <Profile
                                        size={24}
                                        imgUrl={list.userImage}
                                      />
                                      <strong>{list.nickname}</strong>
                                    </div>
                                    <div className='button'>
                                      <button
                                        className='comment'
                                        onClick={() => {
                                          setCommentEdit(list.commentId);
                                          setIsCommentEdit(!isCommentEdit);
                                        }}>
                                        수정
                                      </button>
                                      <button
                                        className='comment'
                                        onClick={commentDelete}
                                        value={list.commentId}>
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                  <p className='comment'>{list.comment}</p>
                                  <p> {list.createdAt?.split("T")[0]}</p>
                                </div>
                              )}
                            </>
                          ) : (
                            <div>
                              <div>
                                <div className='comment'>
                                  <Profile size={24} imgUrl={list.userImage} />
                                  <strong>{list.nickname}</strong>
                                </div>
                                <p>{list.comment}</p>
                                <p> {list.createdAt?.split("T")[0]}</p>
                              </div>
                            </div>
                          )}
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
  > div {
    border-bottom: solid 8px #f7f7f7;
  }

  h2 {
    margin: 0;
  }

  .answer_wrap {
    /* border-bottom: solid 8px #ebebeb; */
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
      padding: 10px 20px;
      color: #7966ff;
      font-size: 16px;

      &.choose {
        color: red;
      }
    }
  }
`;

const SC_Commentbox = styled.div`
  padding: 24px;
`;

const SC_CommentList = styled.div`
  --gray-color: #c4c4c4;
  > div {
    display: flex;
    padding: 18px 24px;
    border-bottom: solid 1px #dadada;
    color: var(--gray-color);
    flex-direction: column;
    justify-content: space-between;
  }

  &:last-child {
    border-bottom: none;
  }

  p {
    flex: auto;
    margin: 3px;
    > textarea {
      width: 1000px;
      height: 100px;
    }
  }
  p.comment {
    flex: auto;
    margin: 3px;
    height: 2rem;
    width: 20%;
    height: 100%;
    > textarea {
      width: 100%;
      height: 100%;
    }
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
  div.mycomment {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      line-height: 1rem;
    }
    > div.button {
      width: 60px;
      justify-content: space-between;
    }
  }
  div.comment {
    display: flex;
    align-items: center;
  }
  button {
    color: var(--gray-color);
    font-size: 1rem;
  }
`;

export default AnswerList;
