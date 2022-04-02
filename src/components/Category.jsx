import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { category } from "../elements/category";

const Category = () => {
  const CategoryList = (v) => {
    window.location.href = `/search/category_${v}`;
  };

  return (
    <Container categoryLength={category.length}>
      <ul>
        <li className='category'>
          언어
          <CategoryLists className='category_list_wrap'>
            <div className='C' onChange={CategoryList}>
              {category.map((c, idx) => (
                <div
                  key={idx}
                  value={c.name}
                  onClick={() => {
                    CategoryList(c.name);
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
  position: relative;
  margin-left: 40px;
  height: inherit;

  ul {
    display: flex;
    gap: 24px;
    height: inherit;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #5e45f2;
  }

  li {
    width: 98px;
    height: inherit;
    line-height: 52px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
  }

  .category:hover {
    .category_list_wrap {
      > div.C {
        padding:5px;
        height: ${({ categoryLength }) =>
          `calc(${categoryLength} * 50px + 10px)`};
      }
    }
  }
`;

const CategoryLists = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 250px;
  z-index: 10;
  padding-top: 16px;

  > div.C {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 15px 0 rgba(36, 13, 177, 0.2);
    transition: height 0.5s ease-out;
    height: 0;
    overflow: hidden;

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
