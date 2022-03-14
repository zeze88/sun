import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { setToken } from "../../shared/token";
import produce from "immer";
import { apiUrl } from "../../elements/testApiUrl";
import { apis } from "../../shared/api";

const SERCH = "SERCH";
const CATEGORY = "CATEGORY";
const TAG = "TAG";

const serch = createAction(SERCH, (serch_list) => ({ serch_list }));
const categorySerch = createAction(CATEGORY, (category_list) => ({
  category_list,
}));
const tagSearch = createAction(TAG, (tag_list) => ({ tag_list }));

const token = sessionStorage.getItem("token");
console.log(token);

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
  return function (dispatch, getState, { history }) {
    axios
      .get(`${apiUrl}/category/search/${category}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(categorySerch(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const tagDB = (tag) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`${apiUrl}/tag/search/${tag}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(tagSearch(res.data));
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
  categorySerch,
  tagDB,
};

export { actionsCreators };
