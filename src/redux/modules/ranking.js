import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { apis } from "../../shared/api";
const TOTAL_RANKING = "TOTAL_RANKING";
const MONTH_RANKING = "MONTH_RANKING";
const WEEK_RANKING = "WEEK_RANKING";

const initialState = {
  total_list: [],
  month_list: [],
  week_list: [],
};
const totalRanking = createAction(TOTAL_RANKING, (list) => ({ list }));
const monthRanking = createAction(MONTH_RANKING, (list) => ({ list }));
const weekRanking = createAction(WEEK_RANKING, (list) => ({ list }));

const totalRankingDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .totalRanking()
      .then((res) => {
        console.log(res.data);
        dispatch(totalRanking(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const monthRankingDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .totalRanking()
      .then((res) => {
        console.log(res.data);
        dispatch(monthRanking(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const weekRankingDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .totalRanking()
      .then((res) => {
        console.log(res.data);
        dispatch(weekRanking(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export default handleActions(
  {
    [TOTAL_RANKING]: (state, action) =>
      produce(state, (draft) => {
        draft.total_list = action.payload.list;
      }),
    [MONTH_RANKING]: (state, action) =>
      produce(state, (draft) => {
        draft.month_list = action.payload.list;
      }),
    [WEEK_RANKING]: (state, action) =>
      produce(state, (draft) => {
        draft.week_list = action.payload.list;
      }),
  },
  initialState
);

const actionCreators = {
  totalRankingDB,
  monthRankingDB,
  weekRankingDB,
};

export { actionCreators };
