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
    window.location.href = `/search/category_${v}`;
  };

  return (
    <Container categoryLength={category.length}>
      <ul>
        <li className='category' onClick={() => setcategortView(!categoryView)}>
          언어
          <CategoryLists className='category_list_wrap' isview={categoryView}>
            <div className='C' onChange={CategoryList}>
              {category.map((c, idx) => (
                <div
                  className={categoryView ? "" : "close"}
                  key={idx}
                  value={c.name}
                  onClick={() => {
                    CategoryList(c.name);
                    setcategortView(!categoryView);
                  }}>
                  {c.name}
                </div>
              ))}
            </div>
          </CategoryLists>
        </li>
        <li onClick={() => history.push("/ranking")}>랭킹</li>
      </ul>
    </Container>
  );
};
const Container = styled.div`
  --height: 100px;
  height: var(--height);
  position: relative;
  margin-left: 40px;

  ul {
    display: flex;
    height: var(--height);
    font-size: 20px;
    font-weight: 700;
    color: #5e45f2;
  }

  li {
    width: 98px;
    height: var(--height);
    line-height: var(--height);
    text-align: center;
    cursor: pointer;
  }

  .category:hover {
    .category_list_wrap {
      height: ${({ categoryLength }) =>
        `calc(${categoryLength} * 50px + 10px)`};
    }
  }
`;

const CategoryLists = styled.div`
  position: absolute;
  top: 100px;
  left: 0;
  width: 250px;
  height: 0;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px 0 rgba(36, 13, 177, 0.2);
  z-index: 10;
  transition: height 0.5s ease-out;

  > div.C {
    position: absolute;
    width: 100%;
    padding: 5px;

    > div {
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
  }
`;

export default Category;
