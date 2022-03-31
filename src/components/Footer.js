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
          <li>
            <a target='_blank' href='https://github.com/zeze88/sun'>
              문의사항
            </a>
          </li>
          <li>
            <a
              target='_blank'
              href='https://oasis-cyclamen-45f.notion.site/5-8-_1-28217e32bae849a5bc95389ed1d5dd73'>
              코알라팀 소개
            </a>
          </li>
          <li>
            <a
              target='_blank'
              href='https://docs.google.com/forms/d/e/1FAIpQLSd4iPrHK_DTflM3n-FfJ_MVxg2NuO-05mG5o1wlx1WvVc0NzA/viewform'>
              버그 제보
            </a>
          </li>
        </ul>
      </div>
    </FooterWrap>
  );
};
const FooterWrap = styled.div`
  min-width: 1440px;
  background-color: #7966ff;
  margin-top: 340px;
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

  a {
    color: #fff;
    text-decoration: none;
  }
`;
export default Footer;
