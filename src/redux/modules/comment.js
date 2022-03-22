import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apiUrl } from "../../elements/testApiUrl";

const token = sessionStorage.getItem("token");

const COMMENT_ADD = "COMMENT_ADD";
const COMMENT_DELETE = "COMMENT_DELETE";

const addComment = createAction(COMMENT_ADD, (comment) => ({ comment }));
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
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        window.alert("댓글 추가 실패");
      });
  };
};

const editCommentDB = (commentId, comment, pid) => {
  console.log(commentId, comment);
  return function (dispatch, getState, { history }) {
    axios
      .put(
        `${apiUrl}/islogin/comment/revice/${commentId}`,
        {
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
        window.location.replace(`/detail/${pid}`);
      })
      .catch((err) => {
        console.log(err);
        window.alert("댓글 수정 실패");
      });
  };
};

const deleteCommentDB = (commentId) => {
  return function (dispatch, getState, { history }) {
    console.log(commentId);
    axios
      .delete(`${apiUrl}/islogin/comment/delete/${commentId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(deleteComment(commentId));
        window.location.reload();
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
        draft.list.push(action.payload);
      }),
    [COMMENT_DELETE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  addComment,
  deleteComment,
  addCommentDB,
  editCommentDB,
  deleteCommentDB,
};

export { actionCreators };
