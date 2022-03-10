import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import { category } from "../elements/category";
import ImgUpload from "../components/ImgUpload";

const Create = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams().pid;

  const pathName = location.pathname === "/create";
  const img_list = useSelector((state) => state.post?.preview);
  const post_one = useSelector((state) => state.post.list);
  const [addPost, setAddPost] = React.useState("");
  const [isSelect, setIsSelect] = React.useState(false);
  const [oneCategory, setOneCategory] = React.useState("카테고리를 선택");
  console.log(post_one);
  React.useEffect(() => {
    dispatch(postActions.getOnePostDB(params));
    if (!pathName) {
      setAddPost(post_one);
    }
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
        category: oneCategory,
      })
    );
  };

  const revise = () => {
    console.log(typeof addPost.tags);
    if (typeof addPost.tags === "string") {
      const tags = addPost.tags?.split("#").splice(1);

      dispatch(
        postActions.editPostDB({
          ...addPost,
          pid: params,
          tag: tags,
          category: oneCategory,
        })
      );
    } else {
      dispatch(
        postActions.editPostDB({
          ...addPost,
          pid: params,
        })
      );
    }
  };

  if (!pathName) {
    return (
      <PostWrap>
        <h1>수정페이지</h1>
        <CategoryDiv length={category.length}>
          <span
            onClick={() => {
              setIsSelect(!isSelect);
            }}>
            {oneCategory}
          </span>
          <ul className={isSelect ? "" : "close"}>
            {category.map((v, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setOneCategory(v);
                  setIsSelect(false);
                }}>
                {v}
              </li>
            ))}
          </ul>
        </CategoryDiv>
        {post_one && (
          <>
            <input
              id='postTitle'
              onChange={onChange}
              type='text'
              placeholder={post_one.postTitle}
            />
            <input
              id='postComment'
              onChange={onChange}
              type='text'
              placeholder={post_one.postComment}
            />
            <input
              id='tags'
              onChange={onChange}
              type='text'
              placeholder={`#${post_one.tag?.join(" #")}`}
            />

            <ImgUpload isEdit={true} />
            <button onClick={revise}>수정 click</button>
            <button
              onClick={() => {
                history.replace(`/detail/${params}`);
              }}>
              취소
            </button>
          </>
        )}
      </PostWrap>
    );
  }

  return (
    <PostWrap>
      <h1>글쓰기 페이지</h1>
      <CategoryDiv length={category.length}>
        <span
          onClick={() => {
            setIsSelect(!isSelect);
          }}>
          {oneCategory}
        </span>
        <ul className={isSelect ? "" : "close"}>
          {category.map((v, idx) => (
            <li
              key={idx}
              onClick={() => {
                setOneCategory(v);
                setIsSelect(false);
              }}>
              {v}
            </li>
          ))}
        </ul>
      </CategoryDiv>

      <input id='title' onChange={onChange} type='text' />
      <input id='comment' onChange={onChange} type='text' />
      <input
        id='tags'
        onChange={onChange}
        type='text'
        placeholder='tag 입력 # 붙여 주세요'
      />

      <ImgUpload />
      <button onClick={submit}>글쓰기 click</button>
    </PostWrap>
  );
};

const PostWrap = styled.div`
  label > input#file-upload-button {
    display: none;
  }
`;

const CategoryDiv = styled.div`
  display: inline-block;
  width: 150px;
  position: relative;

  > span {
    display: block;
    width: 100%;
    text-align: center;
  }

  ul {
    position: absolute;
    top: 40px;
    left: 0;
    height: ${(props) => `calc(${props.length} * 40px)`};
    cursor: pointer;
    border: solid 1px #ebebeb;
    border-bottom: none;
    overflow: hidden;
    margin: 0;
    transition: height 0.5s ease-out;

    &.close {
      height: 0;
    }
  }

  li {
    text-align: center;
    padding: 10px;
    border-bottom: solid 1px #ebebeb;
  }
`;

export default Create;
