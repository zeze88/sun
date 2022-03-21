import React from "react";
import { ReactComponent as FooterLogo } from "../svg/logo_footer.svg";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrap>
      <div>
        <h2>
          <FooterLogo />
        </h2>
        <ul>
          <li>문의사항</li>
          <li>코알리팀 소개</li>
          <li>버그 제보</li>
        </ul>
      </div>
    </FooterWrap>
  );
};
const FooterWrap = styled.div`
  background-color: #7966ff;

  & > div {
    display: flex;
    gap: 64px;
    width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    height: 150px;
    line-height: 150px;
    color: #fff;
  }

  svg {
    vertical-align: middle;
  }

  ul {
    display: flex;
    gap: 64px;
  }

  li {
    color: #fff;
  }
`;
export default Footer;
