/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Slider from 'react-slick';

import { sliderContent } from '../../mock/slider';

import { NextArrow, PrevArrow } from './Arrows';
import Slide from './Slide';

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
      <div className="z-[100] bg-transparent !pb-[40px]">
        <ul> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="relative ">
      <Slider {...settings}>
        {sliderContent.map((slideContent) => {
          return <Slide key={slideContent.ID} {...slideContent} />;
        })}
      </Slider>
      <>
        <div className="bg-palette-card/80 absolute top-1/2 right-4 rounded-full p-1 text-[0.8rem] shadow-lg drop-shadow-lg md:right-3 md:text-[1.8rem] lg:right-8" />
        <div className="bg-palette-card/80 absolute top-1/2  left-4 rounded-full p-1 text-[0.8rem] shadow-lg drop-shadow-lg md:left-3 md:text-[1.8rem] lg:left-8" />
      </>
    </div>
  );
};

export default Carousel;
