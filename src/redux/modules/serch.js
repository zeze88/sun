import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { setToken } from "../../shared/token";
import produce from "immer";
import { apiUrl } from "../../elements/testApiUrl";

const SERCH = "SERCH";

const serch = createAction(SERCH, (serch) => ({ serch }));
const token = sessionStorage.getItem("token");

const initialState = {
  serchlist: [],
};

const serchDB = (title) => {
  return async function (dispatch, getState, { history }) {
    console.log(title);
    await axios
      .get(`${apiUrl}/islogin/post/search/${title}`, {
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

export default handleActions(
  {
    [SERCH]: (state, action) =>
      produce(state, (draft) => {
        draft.serch = action.payload.serch;
      }),
  },
  initialState
);

const actionsCreator = {
  serchDB,
  serch,
};

export { actionsCreator };
