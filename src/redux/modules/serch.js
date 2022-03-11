import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { setToken } from "../../shared/token";
import produce from "immer";
import { apiUrl } from "../../elements/testApiUrl";

const SERCH = "SERCH";
const CATEGORY = "CATEGORY";
const TAG = "TAG";

const serch = createAction(SERCH, (serch_list) => ({ serch_list }));
const category = createAction(SERCH, (category_list) => ({ category_list }));
const tag = createAction(SERCH, (tag_list) => ({ tag_list }));

const token = sessionStorage.getItem("token");

const initialState = {
  serch_list: [],
  category_list: [],
  tag_list: [],
};

const serchDB = (title) => {
  return async function (dispatch, getState, { history }) {
    console.log(title);
    await axios
      .get(`${apiUrl}/post/search/${title}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(serch(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const categoryDB = (category) => {
  return async function (dispatch, getState, { history }) {
    console.log(category);
    await axios
      .get(`${apiUrl}/category/search/${category}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(category(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const tagDB = (tag) => {
  return async function (dispatch, getState, { history }) {
    console.log(tag);
    await axios
      .get(`${apiUrl}/tag/search/${tag}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(tag(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [SERCH]: (state, action) =>
      produce(state, (draft) => {
        draft.serch_list = action.payload.serch_list;
      }),
    [CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.category_list = action.payload.category_list;
      }),
    [TAG]: (state, action) =>
      produce(state, (draft) => {
        draft.tag_list = action.payload.tag_list;
      }),
  },
  initialState
);

const actionsCreators = {
  serchDB,
  serch,
  categoryDB,
  category,
  tagDB,
  tag,
};

export { actionsCreators };
