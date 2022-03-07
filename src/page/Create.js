import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImgUpload from "../components/ImgUpload";
import { actionCreators as postActions } from "../redux/modules/post";

const Create = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams().pid;
  const pathName = location.pathname === "/create";
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
    const tags = addPost.tags.split("#").splice(1);

    dispatch(
      postActions.addPostDB({
        ...addPost,
        tags: tags,
      })
    );
  };

  const revise = () => {
    const tags = addPost.tags.split("#").splice(1);
    console.log(tags);
    dispatch(postActions.editPostDB({ pid: params, ...addPost, tags: tags }));
  };

  return (
    <PostWrap>
      {pathName ? <h1>글쓰기 페이지</h1> : <h1>수정페이지</h1>}
      <input id="title" onChange={onChange} type="text" />
      <input id="comment" onChange={onChange} type="text" />
      <input
        id="tags"
        onChange={onChange}
        type="text"
        placeholder="tag 입력 # 붙여 주세요"
      />

      <ImgUpload />

      {pathName ? (
        <button onClick={submit}>글쓰기 click</button>
      ) : (
        <button onClick={revise}>수정 click</button>
      )}
    </PostWrap>
  );
};

const PostWrap = styled.div`
  label > input#file-upload-button {
    display: none;
  }
`;

export default Create;
