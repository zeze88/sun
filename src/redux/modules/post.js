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

const imgUPUPDB = (img) => {
  return function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");
    const img_list = getState().post.preview;

    let frm = new FormData();
    frm.append("images", img);
    console.log(frm);
    return;
    axios
      .post(
        `http://175.118.48.164:7050/images/upload`,
        {
          headers: { Authorization: `${token}` },
        },
        frm
      )
      .then((res) => {
        console.log("img업로드 성공");
        console.log(res);
        //  img는 받아온 url로  변경
        return;
      });
  };
};
// =====================================================================
// ================================ 추가 ================================
const addPostDB = ({ title, comment }) => {
  return function (dispatch, getState, { history }) {
    const token_res = sessionStorage.getItem("token");
    const img_list = getState().post.preview;
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
        console.log(res);
        console.log("img업로드 성공");
        const imgUrl = res.data.url;
        return imgUrl;
      })
      .then((imgUrl) => {
        console.log("포스트 성공!");
        console.log(imgUrl);
        axios({
          method: "post",
          url: "http://175.118.48.164:7050/islogin/post/write",
          data: {
            postTitle: title,
            postComment: comment,
            postImg: imgUrl,
          },
          headers: { Authorization: `${token_res}` },
        });
        dispatch(addPost({ title, comment, imgUrl }));
      })
      .catch((err) => {
        console.log(err);
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
  imgUPUPDB,
};

export { actionCreators };
