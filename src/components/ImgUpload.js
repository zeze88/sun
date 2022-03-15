import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as answerActions } from "../redux/modules/answer";

const ImgUpload = ({ isEdit = null, editImg = null, cleanImg = null }) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const [preImg, setPreImg] = React.useState("");
  const location = useLocation();
  const pathName = location.pathname !== "/create";

  React.useEffect(() => {
    if (cleanImg === "") {
      fileInput.current.value = "";
    }
  }, [cleanImg]);

  const onChange = (e) => {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
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
      <ImgWrap htmlFor='editImg'>
        <div>
          <i className='icon'></i>
          <span>첨부하기</span>
        </div>
        <input onChange={onChange} id='editImg' type='file' ref={fileInput} />
        <div className='img_box'>
          <img src={editImg} />
        </div>
      </ImgWrap>
    );
  }

  return (
    <ImgWrap htmlFor='img'>
      <div>
        이미지
        <i className='icon'></i>
        <span>첨부하기</span>
      </div>
      <input onChange={onChange} id='img' type='file' ref={fileInput} />
      {preImg && (
        <div className='img_box'>
          <img src={preImg} />
        </div>
      )}
    </ImgWrap>
  );
};

const ImgWrap = styled.label`
  display: flex;
  gap: 24px;
  width: 100%;
  padding: 24px;
  font-weight: 700;
  border-top: solid 1px #ebebeb;
  .img_box {
    flex: auto;
  }
  > div {
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
