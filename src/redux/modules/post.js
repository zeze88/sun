import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { apis } from "../../shared/api";

const GET_POST = "GET_POST";
const GET_POSTCHK = "GET_POSTCHK";
const ONE_POST = "ONE_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DEL_POST = "DEL_POST";
const IMG_POST = "IMG_POST";

const getPost = createAction(GET_POST, (post) => ({ post }));
const getPostNoChk = createAction(GET_POSTCHK, (post) => ({ post }));
const onePost = createAction(ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const delPost = createAction(DEL_POST, (pid) => ({ pid }));
const imgPost = createAction(IMG_POST, (preview) => ({ preview }));

const initialState = {
  list: [],
  nockeckList: [],
  preview: "",
};

// ===================================================================
// ======================== 게시글 리스트 가지고오기========================

const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getpost()
      .then((res) => {
        console.log(res);
        dispatch(getPost(res.data));
      })
      .catch((err) => {
        console.log(err);
        console.log("error get post");
      });
  };
};

const getPostNocheckDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getpostnocheck()
      .then((res) => {
        console.log(res);
        dispatch(getPostNoChk(res.data));
      })
      .catch((err) => {
        console.log(err);
        console.log("error get post");
      });
  };
};

// ====================================================================
// ======================== 선택한 게시글 가지고오기 ========================
const getOnePostDB = (pid) => {
  return function (dispatch, getState, { history }) {
    apis
      .onepost(pid)
      .then((res) => {
        console.log(res);
        dispatch(getPost(res.data));
      })
      .catch((err) => {
        console.log(err);
        console.log("error get one post");
      });
  };
};

// =====================================================================
// ================================ 추가 ================================
const addPostDB = ({ title, comment, tags }) => {
  return function (dispatch, getState, { history }) {
    const token_res = sessionStorage.getItem("token");
    const img_list = getState().post.preview;
    const formData = new FormData();
    formData.append("images", img_list);

    axios
      .post(`http://15.164.231.31/images/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token_res}`,
        },
      })
      .then((res) => {
        // console.log(res);
        console.log("img업로드 성공");
        const imgUrl = res.data.url;
        return imgUrl;
      })
      .then((imgUrl) => {
        console.log("포스트 성공!");

        axios({
          method: "post",
          url: "http://15.164.231.31/islogin/post/write",
          data: {
            postTitle: title,
            postComment: comment,
            postImg: imgUrl,
            tags: tags,
          },
          headers: { Authorization: `${token_res}` },
        }).then((res) => {
          console.log(res);
          dispatch(addPost({ title, comment, imgUrl, tags, pid: res.data }));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// =====================================================================
// ================================ 수정 ================================
const editPostDB = ({ pid, title, comment, tags }) => {
  return function (dispatch, getState, { history }) {
    const token_res = sessionStorage.getItem("token");
    const img_list = getState().post.preview;
    const formData = new FormData();
    formData.append("images", img_list);
    console.log(token_res);

    axios
      .post(`http://15.164.231.31/images/upload`, formData, {
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
        console.log("포스트 성공!");
        axios({
          method: "PUT",
          url: `http://15.164.231.31/islogin/post/revice/${pid}`,
          data: {
            pid: pid,
            postTitle: title,
            postComment: comment,
            postImg: imgUrl,
            tags: tags,
          },
          headers: { Authorization: `${token_res}` },
        });
        dispatch(editPost({ title, comment, imgUrl, tags, pid }));
      })
      .catch((err) => {
        console.log(err);
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

const postLikeDB = (uid, pid) => {
  return function (dispatch, getState, { history }) {
    apis
      .likepost(uid, pid)
      .then((res) => {
        console.log(res);
        // dispatch(delPost(uid,pid));
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
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
    [GET_POSTCHK]: (state, action) =>
      produce(state, (draft) => {
        draft.nockeckList = action.payload.post;
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
  getOnePostDB,
  addPostDB,
  editPostDB,
  delPostDB,
  imgPost,
  getPostNocheckDB,
  postLikeDB,
};

export { actionCreators };
