import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Edituser = () => {
  const userProfileImg = useSelector((state) => state.user);
  console.log(userProfileImg);
  const [userImg, setUserImg] = useState(userProfileImg);
  return (
    <Container>
      <div>빈칸</div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
export default Edituser;
