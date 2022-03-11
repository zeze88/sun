import React from "react";
import styled from "styled-components";

const TableList = ({ currTab }) => {
  const [list, setList] = React.useState();
  React.useEffect(() => {
    if (currTab === "total") {
      setList("토탈");
    } else if (currTab === "answer") {
      setList("답변");
    } else {
      setList("게시글");
    }
  }, [currTab]);

  return (
    <TableListUl>
      <li>
        {list}
        <strong>{list} 알림이 없습니다 :)</strong>
      </li>
      <li>
        <span>"~~~~~"</span>
        <p>답변이 채택되었습니다.</p>
        <em>2022-02-22 08:32: 56</em>
        <button>삭제</button>
      </li>
    </TableListUl>
  );
};

const TableListUl = styled.ul`
  border-top: solid 1px #ebebeb;

  li {
    padding: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    border-bottom: solid 1px #ebebeb;
  }
  strong {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 30px;
  }
  p {
    flex: auto;
    text-align: left;
  }

  span,
  em {
    width: 20%;
  }

  button {
    width: 10%;
  }
`;

export default TableList;
