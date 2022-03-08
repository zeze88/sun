import React from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as answerActions } from "../redux/modules/answer";

const ImgUpload = () => {
  const fileInput = React.useRef();
  const location = useLocation();
  const pathName = location.pathname !== "/create";
  const dispatch = useDispatch();
  console.log(pathName);

  const onChange = (e) => {
    const file = fileInput.current.files[0];
    if (pathName) {
      console.log("답변");
      dispatch(answerActions.asImgPost(file));
    } else {
      console.log("게시글");
      dispatch(postActions.imgPost(file));
    }
  };

  return (
    <label htmlFor="img">
      <input onChange={onChange} id="img" type="file" ref={fileInput} />
    </label>
  );
};

export default ImgUpload;
