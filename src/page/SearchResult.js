import React from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NoticeList from "../elements/NoticeList";
import Serch from "../components/Serch";
import { history } from "../redux/configureStore";
import { actionsCreators as searchActions } from "../redux/modules/serch";

const SearchResult = () => {
  const dispatch = useDispatch();
  const search_type = useParams().keyword.split("_")[0];
  const search_keyword = useParams().keyword.split("_")[1];
  const tag_list = useSelector((state) => state.search.tag_list);
  const serch_list = useSelector((state) => state.search.serch_list);
  const category_list = useSelector((state) => state.search.category_list);

  console.log(tag_list);
  console.log(serch_list);
  console.log(category_list);
  console.log(search_type);
  console.log(search_keyword);

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

  return (
    <div>
      {search_type === "tag" ? (
        <NoticeList list={tag_list} />
      ) : search_type === "serch" ? (
        <NoticeList list={serch_list} />
      ) : search_type === "category" ? (
        <NoticeList list={category_list} />
      ) : (
        <>
          <div>검색 결과가 없습니다 :)</div>
          <button
            onClick={() => {
              history.replace("/");
            }}>
            되돌아가기
          </button>
        </>
      )}
    </div>
  );
};

export default SearchResult;