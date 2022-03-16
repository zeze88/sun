import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const ARAM = "ARAM";
const aram = createAction(ARAM, (list) => ({ list }));
const initialState = {
  status: "",
};
