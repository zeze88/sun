import React from "react";
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

  React.useEffect(() => {
    switch (search_type) {
      case "tag":
        dispatch(searchActions.tagDB(search_keyword));
        break;
    }
  }, []);
  return (
    <div>
      {tag_list.length > 0 ? (
        <NoticeList list={tag_list} />
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
