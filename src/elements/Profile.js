import React from "react";
import styled from "styled-components";
import user from "../svg/user.svg";

const Profile = ({ imgUrl, size = "30" }) => {
  return <ProfileImg imgUrl={imgUrl} size={size}></ProfileImg>;
};

const ProfileImg = styled.span`
  display: inline-block;
  ${(props) =>
    props.size &&
    `
  width: ${props.size}px;
  height: ${props.size}px;
  border-radius:${props.size}px;
  `}
  background: url(${(props) => (props.imgUrl ? props.imgUrl : user)})
    no-repeat center / cover;
`;

export default Profile;
