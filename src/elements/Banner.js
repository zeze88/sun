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
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <BannerSlide {...settings}>
      <div className='banner_wrap'>
        <img src='/banner/banner1.jpg' alt='코알라출시' />
      </div>
      <div className='banner_wrap'>
        <a href=' https://forms.gle/UgsqAc8g3K39smyc8' target='_blank'>
          <img src='/banner/banner2.jpg' alt='설문조사' />
        </a>
      </div>
      <div className='banner_wrap'>
        <a href='https://forms.gle/2jZ1RPbxS5dzjnWZ7' target='_blank'>
          <img src='/banner/banner3.jpg' alt='버그제보' />
        </a>
      </div>
      <div className='banner_wrap'>
        <a href='https://forms.gle/2jZ1RPbxS5dzjnWZ7' target='_blank'>
          <img src='/banner/banner4.jpg' alt='top3배민쿠폰증정' />
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
    width: 342px;
    height: 224px;
    a {
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
