import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/api";

const GET_POST = "GET_POST";
const ONE_POST = "ONE_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DEL_POST = "DEL_POST";

const getPost = createAction(GET_POST, (post) => ({ post }));
const onePost = createAction(ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const delPost = createAction(DEL_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

const getPostDB = (token) => {
  return function (dispatch, getState, { history }) {
    apis
      .getpost()
      .then((res) => {
        console.log(res);
        // dispatch(getPost())
      })
      .catch((err) => {
        console.log(err);
        console.log("error get post");
      });
  };
};

const onePostDB = (token) => {
  return function (dispatch, getState, { history }) {
    apis
      .onepost()
      .then((res) => {
        console.log(res);
        // dispatch(getPost())
      })
      .catch((err) => {
        console.log(err);
        console.log("error get one post");
      });
  };
};

const addPostDB = (title, comment, img) => {
  return function (dispatch, getState, { history }) {
    apis
      .addpost(title, comment, img)
      .then((res) => {
        console.log(res);
        // dispatch(getPost())
      })
      .catch((err) => {
        console.log(err);
        console.log("post 올리기 실패");
      });
  };
};

const editPostDB = (pid, title, comment) => {
  return function (dispatch, getState, { history }) {
    apis
      .editpost(pid, title, comment)
      .then((res) => {
        console.log(res);
        // dispatch(getPost())
      })
      .catch((err) => {
        console.log(err);
        console.log("포스트 수정 실패");
      });
  };
};

const delPostDB = (pid) => {
  return function (dispatch, getState, { history }) {
    apis
      .delpost(pid)
      .then((res) => {
        console.log(res);
        // dispatch(getPost())
      })
      .catch((err) => {
        console.log(err);
        console.log("포스트 삭제 실패");
      });
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list;
      }),

    [ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list;
      }),
    [DEL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list;
      }),
  },
  initialState
);

const actionCreators = {
  getPostDB,
  onePostDB,
  addPostDB,
  editPostDB,
  delPostDB,
};

export { actionCreators };
