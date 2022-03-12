import React from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as answerActions } from "../redux/modules/answer";

const ImgUpload = ({ isEdit = null, editImg = null, cleanImg = null }) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const location = useLocation();
  const pathName = location.pathname !== "/create";

  React.useEffect(() => {
    if (cleanImg === "") {
      fileInput.current.value = "";
    }
  }, [cleanImg]);

  const onChange = (e) => {
    const file = fileInput.current.files[0];
    if (pathName) {
      dispatch(answerActions.asImgPost(file));
    } else {
      dispatch(postActions.imgPost(file));
    }
  };

  if (isEdit) {
    return (
      <label htmlFor='editImg'>
        <input onChange={onChange} id='editImg' type='file' ref={fileInput} />
        <img src={editImg} />
      </label>
    );
  }

  return (
    <label htmlFor='img'>
      <input onChange={onChange} id='img' type='file' ref={fileInput} />
    </label>
  );
};

export default ImgUpload;
