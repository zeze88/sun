import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/api";

const GET_ANSWER = "GET_ANSWER";
const ADD_ANSWER = "ADD_ANSWER";
const EDIT_ANSWER = "EDIT_ANSWER";
const DEL_ANSWER = "DEL_ANSWER";
const LIKE_ANSWER = "LIKE_ANSWER";

const getAnswer = createAction(GET_ANSWER, (answer) => ({ answer }));
const addAnswer = createAction(ADD_ANSWER, (answer) => ({ answer }));
const editAnswer = createAction(EDIT_ANSWER, (answer) => ({ answer }));
const likeAnswer = createAction(LIKE_ANSWER, (answer) => ({ answer }));
const delAnswer = createAction(DEL_ANSWER, (answer) => ({ answer }));

const initialState = {
  list: [],
};

const getAnswerDB = (answrId, answerList) => {
  return function (dispatch, getState, { history }) {
    console.log(answerList);
    apis
      .getpost(answrId)
      .then((res) => {
        console.log(res);
        // const answerList = res.data
        // console.log(answerList);
        dispatch(getAnswer(answerList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addAnswerDB = (pid, uid, title, comment, img) => {
  return function (dispatch, getState, { history }) {
    apis
      .addanswer(pid, uid, title, comment, img)
      .then((res) => {
        console.log(res.data.answsrId);
        const answsrId = res.data.answsrId;
        dispatch(addAnswer({ pid, uid, title, comment, img, answsrId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editAnswerDB = (answsrId, title, comment, img) => {
  return function (dispatch, getState, { history }) {
    apis
      .editanswer(answsrId, title, comment, img)
      .then((res) => {
        dispatch(editAnswer({ answsrId, title, comment, img }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const delAnswerDB = (answsrId) => {
  return function (dispatch, getState, { history }) {
    apis
      .delanswer(answsrId)
      .then((res) => {
        console.log(res);
        dispatch(delAnswer(answsrId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const likeAnswerDB = (uid, pid, answrId, answerUid) => {
  return function (dispatch, getState, { history }) {
    apis
      .likeanswer(uid, pid, answrId, answerUid)
      .then((res) => {
        console.log(res.data.status);
        const status = res.data.status;
        dispatch(likeAnswer({ uid, pid, answrId, answerUid, status }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
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
        // draft.list;
      }),
    [DEL_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        // draft.list;
      }),
    [LIKE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        // draft.list;
      }),
  },
  initialState
);

const actionCreators = {
  getAnswerDB,
  addAnswerDB,
  editAnswerDB,
  delAnswerDB,
  likeAnswerDB,
};

export { actionCreators };
