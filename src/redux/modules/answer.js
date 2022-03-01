import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/api";
import { DRAFT_STATE } from "immer/dist/internal";

const GET_ANSWER = "GET_ANSWER";
const ADD_ANSWER = "ADD_ANSWER";
const EDIT_ANSWER = "EDIT_ANSWER";
const DEL_ANSWER = "DEL_ANSWER";
const LIKE_ANSWER = "LIKE_ANSWER";

const getAnswer = createAction(GET_ANSWER, (answer) => ({ answer }));
const addAnswer = createAction(GET_ANSWER, (answer) => ({ answer }));
const editAnswer = createAction(GET_ANSWER, (answer) => ({ answer }));
const delAnswer = createAction(GET_ANSWER, (answer) => ({ answer }));
const likeAnswer = createAction(GET_ANSWER, (answer) => ({ answer }));

const initialState = {
  list: [],
};

const getAnswerDB = (answrId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getpost(answrId)
      .then((res) => {
        console.log(res);
        dispatch(getAnswer());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addAnswerDB = (pid, uid, title, comment, img) => {
  return function (dispatch, getState, { history }) {
    apis
      .addanswer(pid)
      .then((res) => {
        console.log(res);
        dispatch(addAnswer({ pid, uid, title, comment, img }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editAnswerDB = (pid, uid, title, comment, img) => {
  return function (dispatch, getState, { history }) {
    apis
      .editanswer(pid)
      .then((res) => {
        dispatch(editAnswer({ pid, uid, title, comment, img }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const delAnswerDB = (uid, answsrId) => {
  return function (dispatch, getState, { history }) {
    apis
      .delanswer(answrId)
      .then((res) => {
        console.log(res);
        dispatch(delAnswer(answsrId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const likeAnswerDB = (uid, pid) => {
  return function (dispatch, getState, { history }) {
    apis
      .getpost()
      .then((res) => {
        console.log(res);
        dispatch(likeAnswer(pid));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions({
  [GET_ANSWER]: (state, action) =>
    produce(state, (draft) => {
      draft.list = action.payload.list;
    }),
  [ADD_ANSWER]: (state, action) =>
    produce(state, (draft) => {
      draft.list = draft.list.push(action.payload.list);
    }),
  [EDIT_ANSWER]: (state, action) =>
    produce(state, (draft) => {
      draft.list;
    }),
  [DEL_ANSWER]: (state, action) =>
    produce(state, (draft) => {
      draft.list;
    }),
  [LIKE_ANSWER]: (state, action) =>
    produce(state, (draft) => {
      draft.list;
    }),
});

const actionCreators = {
  getAnswerDB,
  addAnswerDB,
  editAnswerDB,
  delAnswerDB,
  likeAnswerDB,
};

export { actionCreators };
