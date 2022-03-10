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
        <div className='left'>
          <h1>수정페이지</h1>
          <input
            id='postTitle'
            onChange={onChange}
            type='text'
            placeholder={post_one.postTitle}
          />
          <textarea
            id='postComment'
            onChange={onChange}
            type='text'
            placeholder={post_one.postComment}></textarea>

          <ImgUpload isEdit={true} />
        </div>
        <div className='right'>
          {post_one && (
            <>
              <h4>카테고리 선택</h4>
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
              <h4>
                태그입력<em></em>
              </h4>

              <input
                id='tags'
                onChange={onChange}
                type='text'
                placeholder={`#${post_one.tag?.join(" #")}`}
              />
              <button onClick={revise}>수정 click</button>
              <button
                onClick={() => {
                  history.replace(`/detail/${params}`);
                }}>
                취소
              </button>
            </>
          )}
        </div>
      </PostWrap>
    );
  }

  return (
    <PostWrap>
      <div className='left'>
        <h1>글쓰기 페이지</h1>
        <input id='title' onChange={onChange} type='text' placeholder='제목' />
        <textarea
          id='comment'
          onChange={onChange}
          type='text'
          placeholder='내용'></textarea>
        <ImgUpload />
      </div>
      <div className='right'>
        <h4>카테고리 선택</h4>
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
        <h4>
          태그입력<em></em>
        </h4>
        <input
          id='tags'
          onChange={onChange}
          type='text'
          placeholder='tag 입력 # 붙여 주세요'
        />
        <button onClick={submit}>글쓰기 click</button>
      </div>
    </PostWrap>
  );
};

const PostWrap = styled.div`
  display: flex;
  align-items: flex-start;
  label > input#file-upload-button {
    display: none;
  }

  input {
    display: block;
    width: 100%;
    border: none;
    border-bottom: solid 1px #ebebeb;
  }

  textarea {
    display: block;
    width: 100%;
    min-height: 400px;
    resize: none;
    border: none;
    padding: 30px;
  }

  .left {
    flex: 1.2;
    input {
      padding: 30px;
    }
  }

  .right {
    padding: 20px;
    background-color: #f7f7f7;

    input {
      background-color: #fff;
      border-radius: 4px;
    }

    button {
      margin-top: 20px;
      width: 100%;
    }
  }
`;

const CategoryDiv = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 30px;
  position: relative;

  > span {
    display: block;
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: #e7e7e7;
  }

  ul {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: ${(props) => `calc(${props.length} * 40px)`};
    cursor: pointer;
    border: solid 1px #ebebeb;
    border-bottom: none;
    overflow: hidden;
    margin: 0;
    transition: height 0.5s ease-out;
    background-color: #fff;

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
