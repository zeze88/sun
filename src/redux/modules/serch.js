import { createAction, handleAction } from "redux-actions";
import axios from "axios";
import { setToken } from "../../shared/token";
import produce from "immer";

const SERCH = "SERCH";

const serch = createAction((SERCH), (serch)=> ({serch}));
const token = sessionStorage.getItem("token")

const initialState = {
    list:[],
}

const serchDB = (title) => {
    return async function (dispatch, getState, {history}) {
        await axios
        .get('/islogin/post/search',{"postTitle" : title}
        // ,{
        //     headers: {
        //         Authorization: token
        //     },
        // }
        .then((res) => {
            console.log(res)
            // dispatch(serch(res.data));
        })
        .catch((err) => {
            console.log(err)
        }))
        }
}

export default handleAction (
    {
        [SERCH] : (state, action) => produce(state, (draft)=>{
            draft.serch = action.payload.serch;
        })
    },
    initialState
)

const actionsCreator = {
    serchDB
}

export { actionsCreator }