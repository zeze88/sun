import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImgUpload from "../components/ImgUpload";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = () => {
  const dispatch = useDispatch();
  const img_list = useSelector((state) => state.post?.preview);
  const [addPost, setAddPost] = React.useState("");

  React.useEffect(() => {
    if (!img_list?.preview) {
      return;
    }
  }, []);

  const onChange = (e) => {
    const id = e.target.id;
    const content = e.target.value;
    setAddPost({ ...addPost, [id]: content });
  };

  const submit = () => {
    // console.log(img_list);
    // console.log(addPost);
    dispatch(postActions.addPostDB(addPost));
  };

  const revise = () => {
    console.log(img_list?.img);
    dispatch(postActions.editPostDB(addPost));
  };

  return (
    <PostWrap>
      <input id="title" onChange={onChange} type="text" />
      <input id="comment" onChange={onChange} type="text" />
      <ImgUpload />
      <button onClick={submit}>click click</button>
      <button onClick={revise}>revise click</button>
    </PostWrap>
  );
};
const PostWrap = styled.div`
  label > input#file-upload-button {
    display: none;
  }
`;
export default Post;
