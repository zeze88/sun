import React from "react";
import styled from "styled-components";
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
    <ImgWrap htmlFor='img'>
      이미지
      <div>
        <img src='' />
        <span>첨부하기</span>
      </div>
      <input onChange={onChange} id='img' type='file' ref={fileInput} />
    </ImgWrap>
  );
};

const ImgWrap = styled.label`
  display: flex;
  width: 100%;
  padding: 24px;
  border-top: solid 1px #ebebeb;

  input {
    display: none;
  }

  span {
    font-size: 14px;
    color: #797979;
  }
`;

export default ImgUpload;
