import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

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
  };

  return (
    <BannerSlide {...settings}>
      <div className='banner_wrap'>
        <img src='https://cdn.pixabay.com/photo/2014/09/21/14/39/surface-455124__480.jpg' />
      </div>
      <div className='banner_wrap'>
        <img src='https://cdn.pixabay.com/photo/2014/09/21/14/39/surface-455124__480.jpg' />
      </div>
      <div className='banner_wrap'>
        <img src='https://cdn.pixabay.com/photo/2014/09/21/14/39/surface-455124__480.jpg' />
      </div>
    </BannerSlide>
  );
};

const BannerSlide = styled(Slider)`
  margin: 18px 0;
  border-radius: 8px;
  overflow: hidden;

  .slick-slide > div {
    display: flex;
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
      color: #7966ff;
    }
  }

  .slick-next {
    right: 0;
    z-index: 10;
  }

  .slick-prev {
    left: 0;
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
