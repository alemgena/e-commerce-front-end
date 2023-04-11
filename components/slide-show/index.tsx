import React from 'react';
import Slider from 'react-slick';
import Slide from './Slide';
import { sliderContent } from '../../mock/slider';
import { NextArrow, PrevArrow } from '../carousel/Arrows';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
    appendDots: (dots: string) => (
      <div className="bg-transparent !pb-[40px]">
        <ul> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="relative z-0">
      <Slider {...settings}>
        {sliderContent.map((slideContent) => {
          return <Slide key={slideContent.ID} {...slideContent} />;
        })}
      </Slider>
      <>
        <div className="bg-palette-card/80 absolute right-4 top-1/2 rounded-full p-1 text-[0.8rem] shadow-lg drop-shadow-lg md:right-3 md:text-[1.8rem] lg:right-8">
          <HiOutlineChevronRight />
        </div>
        <div className="bg-palette-card/80 absolute left-4  top-1/2 rounded-full p-1 text-[0.8rem] shadow-lg drop-shadow-lg md:left-3 md:text-[1.8rem] lg:left-8">
          <HiOutlineChevronLeft />
        </div>
      </>
    </div>
  );
};

export default Carousel;
