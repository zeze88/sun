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

  const isCreate = location.pathname === "/create";
  const img_list = useSelector((state) => state.post?.preview);
  const post_one = useSelector((state) => state.post.list);
  const [addPost, setAddPost] = React.useState(!isCreate ? post_one : []);
  const [isSelect, setIsSelect] = React.useState(false);
  const [oneCategory, setOneCategory] = React.useState("");
  const token = sessionStorage.getItem("token");
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  React.useEffect(() => {
    if (!token) {
      window.alert("로그인 후 사용해주세요 :)");
      history.replace("/login");
    }
  }, []);

  React.useEffect(() => {
    if (!isCreate) {
      dispatch(postActions.getOnePostDB(params));
      setAddPost(post_one);
    }
  }, []);

  const onChange = (e) => {
    const id = e.target.id;
    const content = e.target.value;

    setAddPost({ ...addPost, [id]: content });
  };

  const submit = () => {
    if (!addPost.title || !addPost.comment) {
      alert("내용을 모두 입력해주세요 :)");
      return;
    } else if (!oneCategory) {
      alert("카테고리를 선택해 주세요 :)");
      return;
    } else if (!img_list) {
      alert("이미지를 추가 해주세요 :)");
    } else {
      const tags = addPost.tags?.split("#").splice(1);

      let text_tag = tags
        .map((v) => (reg.test(v) ? v.replace(reg, "") : v))
        .filter((v) => v !== "");

      dispatch(
        postActions.addPostDB({
          ...addPost,
          tags: text_tag,
          category: oneCategory,
        })
      );
    }
  };
  console.log(oneCategory);
  const revise = () => {
    if (typeof addPost.tags === "string") {
      const tags = addPost.tags?.split("#").splice(1);

      let text_tag = tags
        .map((v) => (reg.test(v) ? v.replace(reg, "") : v))
        .filter((v) => v !== "");

      dispatch(
        postActions.editPostDB({
          ...addPost,
          pid: params,
          tag: text_tag,
          category: oneCategory,
        })
      );
    } else {
      dispatch(
        postActions.editPostDB({
          ...addPost,
          pid: params,
          category: oneCategory,
        })
      );
    }
  };
  console.log(addPost);
  if (!isCreate) {
    return (
      <PostWrap>
        <div className='left'>
          <h1>수정페이지</h1>
          <input
            id='postTitle'
            onChange={onChange}
            type='text'
            value={addPost.postTitle}
          />
          <textarea
            id='postComment'
            onChange={onChange}
            type='text'
            value={addPost.postComment}></textarea>

          <ImgUpload isEdit={true} editImg={addPost.postImg} />
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
                  {oneCategory
                    ? oneCategory
                    : addPost.category
                    ? addPost.category
                    : " 카테고리를 선택"}
                </span>
                <ul className={isSelect ? "" : "close"}>
                  {category.map((v, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setOneCategory(v.name);
                        setIsSelect(false);
                      }}>
                      {v.name}
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
            {oneCategory === "" ? " 카테고리를 선택" : oneCategory}
          </span>
          <ul className={isSelect ? "" : "close"}>
            {category.map((v, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setOneCategory(v.name);
                  setIsSelect(false);
                }}>
                {v.name}
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
          placeholder='특수문자는 # 만 입력 가능합니다.'
        />
        <button onClick={submit}>올리기</button>
      </div>
    </PostWrap>
  );
};

const PostWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;

  gap: 24px;

  label > input#file-upload-button {
    display: none;
  }

  h4 {
    margin-bottom: 8px;
    font-size: 20px;
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
    padding: 24px;
    font-size: 14px;
  }

  .left {
    flex: auto;
    input {
      padding: 24px;
    }
  }

  .right {
    width: 342px;
    padding: 63px 20px;
    font-size: 14px;
    background-color: #f9f8ff;

    input {
      padding: 0 10px;
      color: #7966ff;
      background-color: #fff;
      border-radius: 8px;
      line-height: 46px;
      &::placeholder {
        color: #7966ff;
      }
    }

    button {
      width: 100%;
      line-height: 50px;
      margin-top: 48px;
      background-color: #333;
      border-radius: 8px;
      font-size: 16px;
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
    line-height: 46px;
    text-align: center;
    border-radius: 8px;
    color: #7966ff;
    background-color: #fff;
  }

  ul {
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    height: ${(props) => `calc(${props.length} * 46px + 20px)`};
    overflow: hidden;
    margin: 0;
    transition: height 0.5s ease-out;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
    box-shadow: 5px 5px 15px 9px rgba(157, 157, 157, 0.1);

    &.close {
      height: 0;
      padding: 0;
    }
  }

  li {
    margin: 0 10px;
    text-align: center;
    line-height: 46px;
    cursor: pointer;

    &:nth-child(1) {
      margin-top: 10px;
    }

    &:last-child {
      margin-bottom: 10px;
    }
    &:hover {
      background-color: #7966ff;
      color: #fff;
    }
  }
`;

export default Create;
