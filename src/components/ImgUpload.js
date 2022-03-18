import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as answerActions } from "../redux/modules/answer";

const ImgUpload = ({ isEdit = null, editImg = null, cleanImg = null }) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const [preImg, setPreImg] = React.useState("");
  const location = useLocation();
  const pathName = location.pathname.indexOf("/detail") >= 0;

  React.useEffect(() => {
    if (cleanImg === "") {
      fileInput.current.value = "";
      setPreImg("");
    }
  }, [cleanImg]);

  const onChange = (e) => {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreImg(reader.result);
    };

    if (pathName) {
      dispatch(answerActions.asImgPost(file));
    } else {
      dispatch(postActions.imgPost(file));
    }
  };

  if (isEdit) {
    return (
      <ImgWrap className='img_load'>
        <label htmlFor='editImg'>
          <i className='icon'></i>
          <span>첨부하기</span>
        </label>
        <input onChange={onChange} id='editImg' type='file' ref={fileInput} />
        <div className='img_box'>
          <img src={preImg ? preImg : editImg} />
        </div>
      </ImgWrap>
    );
  }

  return (
    <ImgWrap className='img_load'>
      <label htmlFor='img'>
        <i className='icon'></i>
        <span>이미지 첨부하기</span>
      </label>
      <input onChange={onChange} id='img' type='file' ref={fileInput} />
      {preImg && (
        <div className='img_box'>
          <img src={preImg} />
        </div>
      )}
    </ImgWrap>
  );
};

const ImgWrap = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  padding: 24px;
  font-weight: 700;
  border-bottom: solid 1px #ccc;

  .img_box {
    flex: auto;
  }

  > label {
    flex: none;
  }

  input {
    display: none !important;
  }

  i {
    display: inline-block;
    margin-left: 24px;
    margin-right: 8px;
  }

  span {
    color: #797979;
  }

  img {
    max-width: 100%;
  }
`;

export default ImgUpload;
