import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { apis } from "../../shared/api";

const GET_ANSWER = "GET_ANSWER";
const ADD_ANSWER = "ADD_ANSWER";
const EDIT_ANSWER = "EDIT_ANSWER";
const DEL_ANSWER = "DEL_ANSWER";
const LIKE_ANSWER = "LIKE_ANSWER";
const AS_IMG_POST = "AS_IMG_POST";

const getAnswer = createAction(GET_ANSWER, (answer) => ({ answer }));
const addAnswer = createAction(ADD_ANSWER, (answer) => ({ answer }));
const editAnswer = createAction(EDIT_ANSWER, (answer) => ({ answer }));
const likeAnswer = createAction(LIKE_ANSWER, (answer) => ({ answer }));
const delAnswer = createAction(DEL_ANSWER, (answer) => ({ answer }));
const asImgPost = createAction(AS_IMG_POST, (asPreview) => ({ asPreview }));

const initialState = {
  list: [],
  asPreview: "",
};

const getAnswerDB = (answrId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getpost(answrId)
      .then((res) => {
        console.log(res);
        // const answerList = res.data
        // console.log(answerList);
        dispatch(getAnswer(answrId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addAnswerDB = ({ pid, uid, title, comment }) => {
  return function (dispatch, getState, { history }) {
    const token_res = sessionStorage.getItem("token");
    const img_list = getState().answer.asPreview;
    const formData = new FormData();
    formData.append("images", img_list);

    axios
      .post(`http://175.118.48.164:7050/images/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token_res}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const imgUrl = res.data.url;
        return imgUrl;
      })
      .then((imgUrl) => {
        console.log("img업로드 성공");
        axios({
          method: "post",
          url: `http://175.118.48.164:7050/islogin/answer/${pid}`,
          data: {
            pid: pid,
            uid: uid,
            answerTitle: title,
            answerComment: comment,
            answerImg: imgUrl,
          },
          headers: { Authorization: token_res },
        }).then((res) => {
          console.log(res);

          dispatch(
            addAnswer({
              pid,
              uid,
              title,
              comment,
              answerImg: imgUrl,
              answsrId: res.data,
              answerUid: uid,
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editAnswerDB = ({ answsrId, title, comment }) => {
  return function (dispatch, getState, { history }) {
    const token_res = sessionStorage.getItem("token");
    const img_list = getState().answer.asPreview;
    const formData = new FormData();
    formData.append("images", img_list);

    axios
      .post(`http://175.118.48.164:7050/images/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token_res}`,
        },
      })
      .then((res) => {
        console.log("img업로드 성공");
        const imgUrl = res.data.url;
        return imgUrl;
      })
      .then((imgUrl) => {
        console.log("answer 성공!");
        console.log(imgUrl);
        axios({
          method: "put",
          url: `http://175.118.48.164:7050/islogin/answer/revice/${answsrId}`,
          data: {
            answerTitle: title,
            answerComment: comment,
            answerImg: imgUrl,
          },
          headers: { Authorization: `${token_res}` },
        }).then((res) => {
          console.log(res);
          dispatch(
            editAnswer({
              title,
              comment,
              answerImg: imgUrl,
              answsrId: answsrId,
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const delAnswerDB = (answsrId) => {
  console.log(answsrId);
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

const chooseAnswerDB = ({ uid, pid, answrId, answerUid }) => {
  return function (dispatch, getState, { history }) {
    apis
      .chooseAnswer(uid, pid, answrId, answerUid)
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
    [AS_IMG_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.asPreview = action.payload.asPreview;
      }),
  },
  initialState
);

const actionCreators = {
  getAnswerDB,
  addAnswerDB,
  editAnswerDB,
  delAnswerDB,
  chooseAnswerDB,
  asImgPost,
};

export { actionCreators };
