import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NoticeList from "../elements/NoticeList";
import { history } from "../redux/configureStore";
import { actionsCreators as searchActions } from "../redux/modules/serch";

const SearchResult = () => {
  const dispatch = useDispatch();
  const search_type = useParams().keyword.split("_")[0];
  const search_keyword = useParams().keyword.split("_")[1];
  const tag_list = useSelector((state) => state.search.tag_list);
  const serch_list = useSelector((state) => state.search.serch_list);
  const category_list = useSelector((state) => state.search.category_list);

  React.useEffect(() => {
    switch (search_type) {
      case "tag":
        return dispatch(searchActions.tagDB(search_keyword));
      case "serch":
        return dispatch(searchActions.serchDB(search_keyword));
      case "category":
        return dispatch(searchActions.categoryDB(search_keyword));
      default:
        return null;
    }
  }, [search_type]);
  console.log(tag_list.length === 0);
  return (
    <Container>
      {search_type === "tag" ? (
        <NoticeList list={tag_list} />
      ) : search_type === "serch" ? (
        <NoticeList list={serch_list} />
      ) : (
        <NoticeList list={category_list} />
      )}
      {(tag_list.length === 0 ||
        serch_list.length === 0 ||
        category_list.length === 0) && (
        <NoSearch>
          <h2>검색 결과가 없습니다 :)</h2>
          <button
            onClick={() => {
              history.replace("/");
            }}>
            되돌아가기
          </button>
        </NoSearch>
      )}
    </Container>
  );
};
const NoSearch = styled.div`
  padding: 200px;
  min-height: calc(100vh - 250px);
  text-align: center;

  h2 {
    font-size: 30px;
    font-weight: 700;
  }

  button {
    margin-top: 40px;
    padding: 16px 40px;
    background-color: #ddd;
    border-radius: 8px;
    color: #fff;
    transition: all 0.4s;

    &:hover {
      background-color: #7966ff;
    }
  }
`;
const Container = styled.div`
  width: 1440px;
  margin: auto;
`;
export default SearchResult;
