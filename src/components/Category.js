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
    history.push(`/search/category_${v}`);
  };

  return (
    <Container>
      <ul>
        <li onClick={CategoryView}>언어</li>
        <li onClick={() => history.push("/ranking")}>랭킹</li>
      </ul>
      <div className='category_list'>
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
  position: relative;
  margin-left: 40px;

  ul {
    display: flex;
    font-size: 20px;
    font-weight: 700;
    color: #5e45f2;
  }

  li {
    width: 98px;
    height: 46px;
    line-height: 46px;
    text-align: center;
  }

  .category_list {
    position: absolute;
    top: 74px;
    left: 0;
    width: 250px;
    border-radius: 8px;
    box-shadow: 0 4px 15px 0 rgba(36, 13, 177, 0.2);
    background-color: #fff;

    > div {
      padding: 5px;
    }
  }

  div.C {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 12px;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
      color: #fff;
      background-color: #7966ff;
    }
  }
`;
export default Category;
