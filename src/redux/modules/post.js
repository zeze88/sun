import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { apis } from "../../shared/api";

const GET_POST = "GET_POST";
const ONE_POST = "ONE_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DEL_POST = "DEL_POST";
const IMG_POST = "IMG_POST";

const getPost = createAction(GET_POST, (post) => ({ post }));
const onePost = createAction(ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const delPost = createAction(DEL_POST, (pid) => ({ pid }));
const imgPost = createAction(IMG_POST, (preview) => ({ preview }));

const initialState = {
  list: [],
  preview: "",
};

// ===================================================================
// ======================== 게시글 리스트 가지고오기========================

const getPostDB = (token) => {
  return function (dispatch, getState, { history }) {
    apis
      .getpost()
      .then((res) => {
        console.log(res);
        dispatch(getPost());
      })
      .catch((err) => {
        console.log(err);
        console.log("error get post");
      });
  };
};

// ====================================================================
// ======================== 선택한 게시글 가지고오기 ========================
const onePostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .onepost()
      .then((res) => {
        console.log(res);
        dispatch(onePost());
      })
      .catch((err) => {
        console.log(err);
        console.log("error get one post");
      });
  };
};

// =====================================================================
// ================================ 추가 ================================
const addPostDB = ({ title, comment }) => {
  return function (dispatch, getState, { history }) {
    const img_list = getState().post.preview;

    const formData = new FormData();
    formData.append("images", img_list);

    axios
      .post(`http://175.118.48.164:7050/images/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("img업로드 성공");
        console.log(res);
        //  img는 받아온 url로  변경
        apis
          .addpost(title, comment, img_list)
          .then((res) => {
            console.log("post 업로드 성공");
            console.log(res);
            dispatch(addPost({ title, comment, img_list }));
          })
          .catch((err) => {
            console.log(err);
            console.log("post 올리기 실패");
          });
      })
      .catch((err) => {
        console.log("이미지 전송 실패!");
      });
  };
};

// =====================================================================
// ================================ 수정 ================================
const editPostDB = ({ pid, title, comment, img }) => {
  return function (dispatch, getState, { history }) {
    const formData = new FormData();
    formData.append("images", img);
    axios
      .post(`/images/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        //  img는 받아온 url로  변경
        apis
          .editpost(pid, title, comment, img)
          .then((res) => {
            console.log(res);
            dispatch(editPost({ pid, title, comment, img }));
          })
          .catch((err) => {
            console.log(err);
            console.log("포스트 수정 실패");
          });
      });
  };
};

// =====================================================================
// ================================ 삭제 ================================
const delPostDB = (pid) => {
  return function (dispatch, getState, { history }) {
    apis
      .delpost(pid)
      .then((res) => {
        console.log(res);
        dispatch(delPost(pid));
      })
      .catch((err) => {
        console.log(err);
        console.log("포스트 삭제 실패");
      });
  };
};

// =====================================================================
// ============================== reducer ==============================
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
    [ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
    [DEL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((v) => v.pid !== action.payload.pid);
      }),
    [IMG_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
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
  imgPost,
};

export { actionCreators };
