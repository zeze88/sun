import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Edituser = () => {
  const userProfileImg = useSelector((state) => state);
  console.log(userProfileImg);
  const dispatch = useDispatch();
  const [userImg, setUserImg] = useSelector();
  return <div>빈칸</div>;
};

export default Edituser;
