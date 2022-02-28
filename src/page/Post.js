import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = () => {
  const [addPost, setAddPost] = React.useState("");
  const dispatch = useDispatch();
  const onChange = (e) => {
    const id = e.target.id;
    const content = e.target.value;
    setAddPost({ ...addPost, [id]: content });
  };

  const submit = () => {
    dispatch(postActions.addPostDB(addPost));
  };

  const revise = () => {
    dispatch(postActions.editPostDB(addPost));
  };

  return (
    <div>
      <input id="title" onChange={onChange} type="text" />
      <input id="comment" onChange={onChange} type="text" />
      <input id="img" onChange={onChange} type="text" />
      <button onClick={submit}>click click</button>
      <button onClick={revise}>revise click</button>
    </div>
  );
};

export default Post;
