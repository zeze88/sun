import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImgUpload from "../components/ImgUpload";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post);
  const [post_list, SetPostList] = React.useState();

  console.log(postList);
  React.useEffect(() => {}, []);
  return <div></div>;
};

export default Post;
