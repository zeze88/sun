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
