import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticeBoard from "../components/NoticeBoard";

const Post = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post);
  const [post_list, SetPostList] = React.useState();
  //  삭제 해주세용
  const search = "";
  console.log(postList);
  React.useEffect(() => {}, []);
  return <div>{search ? "" : <NoticeBoard />}</div>;
};

export default Post;
