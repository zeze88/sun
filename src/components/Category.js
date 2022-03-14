import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { category } from "../elements/category";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as categoryActions } from "../redux/modules/serch";
import { useParams } from "react-router";

const Category = () => {
  const dispatch = useDispatch();
  const category_list = useSelector((state) => state.category_list);
  const [categoryView, setcategortView] = useState(false);
  const CategoryView = () => {
    setcategortView(!categoryView);
  };

  const CategoryList = (v) => {
    // dispatch(categoryActions.categoryDB(v));
    // console.log(category_list)
    history.push(`/search/category_${v}`);
  };

  return (
    <Container>
      <div>
        <div onClick={() => history.push("/")}>전체 게시글</div>
        <div onClick={CategoryView}>언어 카테고리</div>
        <div onClick={() => history.push("/ranking")}>랭킹</div>
      </div>
      <div>
        {categoryView ? (
          <div onChange={CategoryList}>
            {category.map((c, idx) => (
              <div
                className='C'
                key={idx}
                value={c.value}
                onClick={() => CategoryList(c.value)}>
                {c.name}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 1280px;
  height: 30px;
  display: flex;
  flex-direction: column;
  margin: auto;
  > div {
    display: flex;
    width: 1280px;
    margin-top: 1rem;
    > div {
      width: 100px;
      margin-left: 1rem;
    }
  }
  div.C {
    width: 250px;
    height: 30px;
    display: flex;
    flex-direction: column;
    margin: 0 0 0 7rem;
    cursor: pointer;
    position: relative;
    z-index: 5;
  }
`;
export default Category;
