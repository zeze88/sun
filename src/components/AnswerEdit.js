import React from "react";
import Answer from "./Answer";

const AnswerEdit = ({ isEdit, list }) => {
  return <div>{isEdit && <Answer list={list} />}</div>;
};

export default AnswerEdit;
