import axios from "axios";
import Swal from "sweetalert2";
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
    axios
      .post(
        `${apiUrl}/islogin/comment/create`,
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
        dispatch(addComment(res));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("", "댓글 추가 실패", "error");
      });
  };
};

const editCommentDB = (commentId, comment, pid) => {
  return function (dispatch, getState, { history }) {
    axios
      .put(
        `${apiUrl}/islogin/comment/edit/${commentId}`,
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
        window.location.replace(`/detail/${pid}`);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("", "댓글 수정 실패", "error");
      });
  };
};

const deleteCommentDB = (commentId) => {
  return function (dispatch, getState, { history }) {
    axios
      .delete(`${apiUrl}/islogin/comment/delete/${commentId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(deleteComment(commentId));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("", "댓글 삭제 실패", "error");
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
