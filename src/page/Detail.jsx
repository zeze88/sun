import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as answerActions } from "../redux/modules/answer";

import Swal from "sweetalert2";

import { history } from "../redux/configureStore";
import Answer from "../components/Answer";
import AnswerList from "../components/AnswerList";
import Profile from "../elements/Profile";
import Postchat from "../components/Postchat";
import Banner from "../elements/Banner";

const Detail = () => {
  const dispatch = useDispatch();
  const pid = useParams().pid;
  const post_one = useSelector((state) => state.post.one_list);
  const user_info = useSelector((state) => state.user.user.uid);
  const date = post_one.createdAt?.split("T")[0];

  const delPost = () => {
    Swal.fire({
      title: "게시글을 삭제하시겠습니까?",
      text: "삭제된 게시물은 다시 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네 삭제하겠습니다.",
      confirmButtonColor: "#7966FF",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postActions.delPostDB(pid));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("", "삭제가 취소 되었습니다 :)", "error");
      }
    });
  };

  const likebtn = () => {
    if (!user_info) {
      Swal.fire("", "로그인 후 이용해주세요", "error");
    } else {
      dispatch(postActions.postLikeDB(user_info, pid));
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(answerActions.getAnswerDB(pid));
    dispatch(postActions.getOnePostDB(pid));

    if (!post_one) {
      dispatch(postActions.getOnePostDB(pid));
    }
  }, []);

  return (
    <Container>
      <div className='post_wrap'>
        <Question>
          <Top>
            <div className='header'>
              <h2>{post_one.postTitle}</h2>
              <span
                className='category'
                onClick={() => {
                  history.push(`/search/category_${post_one.category}`);
                }}>
                {post_one.category}
              </span>
            </div>
            <div className='post_info'>
              <dl className='user_info'>
                <dt>
                  <Profile size='24' migUrl={post_one.userImage} />
                </dt>
                <dd>{post_one.nickname}</dd>
              </dl>
              <em>{date}</em>
              <i>관심 {post_one.postLikeCount}</i>
            </div>
          </Top>
          <ContextWrap>
            <div className='text-wrap'>
              <p>{post_one.postComment}</p>
              {post_one.postImg && <img src={post_one.postImg} />}
            </div>

            <div className='btn_wrap'>
              <TagUl>
                {post_one.tag?.map((v, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      history.push(`/search/tag_${v}`);
                    }}>
                    #{v}
                  </li>
                ))}
              </TagUl>
              {Number(user_info) === post_one.uid ? (
                <>
                  <button onClick={delPost}>
                    삭제
                  </button>
                  <button
                  className="edit_btn"
                    onClick={() => {
                      history.push(`/edit/${pid}`);
                    }}>
                    수정
                  </button>
                </>
              ) : (
                <button onClick={likebtn}>관심 {post_one.postLikeCount}</button>
              )}
            </div>
          </ContextWrap>
        </Question>
        {user_info && <Answer />}
        <AnswerList isWriter={post_one.uid} />
      </div>
      <div className='right'>
        <div>
          <Postchat pid={pid} />
          <Banner />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 22px;
  width: 1440px;
  margin: 0 auto;

  .post_wrap {
    width: calc(100% - 342px - 22px);
  }

  .right {
    flex: none;
    width: 342px;
    margin-bottom: 24px;

    > div {
      position: sticky;
      top: 0;
    }
  }
`;

const Question = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px 0 rgba(228, 226, 242, 0.45);
`;

const Top = styled.div`
  padding: 38px 24px 24px;
  border-bottom: solid 1px #dadada;

  h2 {
    font-size: 20px;
    word-break: break-all;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header {
    padding-bottom: 26px;

    span {
      cursor: pointer;
    }
  }

  .category {
    --cate-color: #797979;
    font-size: 12px;
    color: var(--cate-color);
    border: solid 1px var(--cate-color);
    margin-left: 10px;
    padding: 3px 9px;
    height: 25px;
    border-radius: 20px;
  }

  .post_info {
    --main-color: #c4c4c4;
    justify-content: flex-end;
    color: var(--main-color);
    font-weight: 700;

    span {
      vertical-align: middle;
    }

    em {
      padding: 0 16px;
      margin: 0 16px;
      font-style: normal;
      border-left: solid 1px var(--main-color);
      border-right: solid 1px var(--main-color);
    }

    i {
      font-style: normal;
    }
  }

  .user_info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ContextWrap = styled.div`
  padding: 24px;

  .text-wrap {
    min-height: 250px;
    white-space: pre;

    > *:not(style) {
      margin-bottom: 10px;
    }
  }

  p {
    word-break: break-all;
  }

  .btn_wrap {
    display: flex;
    align-items: center;

    ul {
      margin-right: auto;
    }

    button {
      width: 94px;
      padding: 10px 16px;
      color: #7966ff;
      font-size: 16px;
    }
    
    .edit_btn{
      position: relative;
      &:before {
        content: "";
        position: absolute;
        left:-1px;
        width:1px;
        height: 18px;
        background-color: #7966ff;
      }
    }
  }
`;

const TagUl = styled.ul`
  --main-color: #797979;

  display: inline-flex;
  color: var(--main-color);
  font-size: 12px;

  li {
    height: 17px;
    padding: 0 10px;
    cursor: pointer;
  }
`;

export default Detail;
