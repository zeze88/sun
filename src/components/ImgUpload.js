import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const ImgUpload = () => {
  const fileInput = React.useRef();
  const dispatch = useDispatch();

  const onChange = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(postActions.imgPost(reader.result));
    };
  };

  return (
    <label htmlFor="img">
      <input onChange={onChange} id="img" type="file" ref={fileInput} />
    </label>
  );
};

export default ImgUpload;
