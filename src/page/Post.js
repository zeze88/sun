import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticeBoard from "../components/NoticeBoard";

const Post = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post);
  const [post_list, SetPostList] = React.useState();

  console.log(postList);
  React.useEffect(() => {}, []);
  return (
    <div>
      <NoticeBoard />
    </div>
  );
};

export default Post;
