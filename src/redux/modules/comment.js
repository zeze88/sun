import React from "react";
import axios from "axios";
import { createAction, handleActions } from "redux-actions";

const COMMENT_ADD = "COMMENT_ADD"
const COMMENT_EDIT = "COMMENT_EDIT"
const COMMENT_DELETE = "COMMENT_DELETE"

const addComment = createAction(COMMENT_ADD, (comment) => ({ comment }));
const editComment = createAction(COMMENT_EDIT, (comment) => ({ comment }));
const eleteComment = createAction(COMMENT_DELETE, (comment) => ({ comment }));

const addpostCommentDB = (uid, pid, title, comment) => {
    return function (dispatch, getState, { history }) {
        const token_res = sessionStorage.getItem("token");
        axios
        .post('http://175.118.48.164:7050/islogin/comment/write',{
            "uid" : 1,
            "pid" : 1,
            "answerId" : 1,
            "commentTitle" : title,
            "comment" : comment,
        })
        .then((res) => {
            console.log(res)
            dispatch(addComment({ title, comment }));
        })
    }
}

const addanswerCommentDB = (uid, pid, ) => {

}