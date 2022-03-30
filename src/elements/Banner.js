import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { ReactComponent as Banner1Svg } from "../svg/banner/banner1.svg";
import { ReactComponent as Banner2Svg } from "../svg/banner/banner2.svg";
import { ReactComponent as Banner3Svg } from "../svg/banner/banner3.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <BannerSlide {...settings}>
      <div className='banner_wrap'>
        <a
          href='https://docs.google.com/forms/d/e/1FAIpQLSd4iPrHK_DTflM3n-FfJ_MVxg2NuO-05mG5o1wlx1WvVc0NzA/viewform'
          target='_blank'>
          <Banner1Svg />
        </a>
      </div>
      <div className='banner_wrap'>
        <Banner2Svg />
      </div>
      <div className='banner_wrap'>
        <a
          href='https://docs.google.com/forms/d/1lBFDtUTkM-LdD2fB7XUTNQnHyN-gK4RmrY1jcilyjyY/edit'
          target='_blank'>
          <Banner3Svg />
        </a>
      </div>
    </BannerSlide>
  );
};

const BannerSlide = styled(Slider)`
  margin-top: 18px;
  border-radius: 8px;
  overflow: hidden;

  .slick-slide {
    & > div {
      display: flex;
    }
  }

  .banner_wrap {
    svg {
      display: flex;
    }
  }
  /* slide button */
  &:hover {
    .slick-next,
    .slick-prev {
      opacity: 1;
    }
  }

  .slick-next,
  .slick-prev {
    opacity: 0;

    &:before {
      color: #fff;
    }
  }

  .slick-next {
    right: 4px;
    z-index: 10;
  }

  .slick-prev {
    left: 4px;
    z-index: 10;
  }

  /* slide dots */
  .slick-dots {
    bottom: 18px;

    & li {
      width: 18px;
      height: 18px;
      margin: 0;
    }

    & li button {
      width: 100%;
      height: 100%;
      padding: 0;

      &:before {
        width: 100%;
        height: 100%;
        color: #fff;
      }
    }
  }
`;
export default Banner;
