import React from "react";
import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apiUrl } from "../../elements/testApiUrl";

const token = sessionStorage.getItem("token");

const COMMENT_ADD = "COMMENT_ADD";
const COMMENT_EDIT = "COMMENT_EDIT";
const COMMENT_DELETE = "COMMENT_DELETE";

const addComment = createAction(COMMENT_ADD, (comment) => ({ comment }));
const editComment = createAction(COMMENT_EDIT, (comment) => ({ comment }));
const deleteComment = createAction(COMMENT_DELETE, (comment) => ({ comment }));

const initialState = {
  list: [],
};

const addCommentDB = (uid, pid, answerId, comment) => {
  return function (dispatch, getState, { history }) {
    console.log(uid, pid, answerId, comment);
    axios
      .post(
        `${apiUrl}/islogin/comment/write`,
        {
          uid: uid,
          pid: pid,
          answerId: answerId,
          comment: comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(addComment(res));
      })
      .catch((err) => {
        console.log(err);
        window.alert("댓글 추가 실패");
      });
  };
};

const editCommentDB = (commentId, title, comment) => {
  return function (dispatch, getState, { history }) {
    axios
      .put(
        `${apiUrl}1/islogin/comment/revice/${commentId}`,
        {
          commentTitle: title,
          comment: comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(editComment(title, comment));
      })
      .catch((err) => {
        console.log(err);
        window.alert("댓글 수정 실패");
      });
  };
};

const deleteCommentDB = (commentId) => {
  return function (dispatch, getState, { history }) {
    axios
      .delete(`${apiUrl}/islogin//islogin/comment/delete/${commentId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {
        console.log(err);
        window.alert("댓글 삭제 실패");
      });
  };
};

export default handleActions(
  {
    [COMMENT_ADD]: (state, action) =>
      produce(state, (draft) => {
        console.log("코멘트");
        draft.list.push(action.payload);
      }),
    [COMMENT_EDIT]: (state, action) =>
      produce(state, (draft) => {
        const newComments = draft.list.find(
          (c) => c.commentId === action.payload.commentId
        );
        newComments.comment = action.payload.newComment;
      }),
    [COMMENT_DELETE]: (state, action) =>
      produce(state, (draft) => {
        const filter_comment = draft.list.filter(
          (c) => c.commentId !== action.payload.commentId
        );
        draft.list = filter_comment;
      }),
  },
  initialState
);

const actionCreators = {
  addComment,
  editComment,
  deleteComment,
  addCommentDB,
  editCommentDB,
  deleteCommentDB,
};

export { actionCreators };

// <Commentbox className="comment">
// <Comment />
// </Commentbox>

// const Commentbox = styled.div`
//   @media screen and (min-width: 1050px) {
//     .comment {
//       width: 50%;
//     }
//   }
// `;
