import React from 'react';
import Link from 'next/link';
import { NextArrow, PrevArrow } from './carousel-box-arrows';
import Slider from 'react-slick';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

interface Props {
  title: string;
  className?: string;
  href?: string;
  children?: React.ReactNode;
  full?: boolean;
}

const CarouselBox: React.FC<Props> = ({ title, className, children, full }) => {
  const slidesToShow =
    Array.isArray(children) && children.length === 2
      ? 1
      : Math.min((Array.isArray(children) && children?.length) || 5, 5);
  const slidesToScroll =
    Array.isArray(children) && children.length === 2
      ? 1
      : Math.min((Array.isArray(children) && children?.length) || 5, 5);

  const settings = {
    infinite: true,
    speed: 600,
    centerPadding: '60px',
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    initialSlide: 0,
    swipeToSlide: true,
    rtl: true,
    nextArrow: <NextArrow to={'Next'} />,
    prevArrow: <PrevArrow to={'Prev'} />,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className={`mx-auto my-8 flex w-[100%] rounded-md ${
        full ? 'flex-col' : 'bg-[#37bccef9]'
      }`}
    >
      <div
        className={`flex flex-grow flex-col items-center justify-around rounded-md bg-cover bg-center bg-no-repeat text-sm backdrop-blur-md sm:text-base ${className}`}
      >
        <h2
          className={`text-lg font-bold sm:text-xl ${
            full
              ? 'text-palette-base self-start'
              : 'text-palette-primary text-center'
          }`}
        >
          {`${title}`}
        </h2>
      </div>

      <div
        className={`relative ${
          full ? 'w-50 mt-4' : 'w-[65%] overflow-x-hidden sm:w-[65%] md:w-[75%]'
        }`}
      >
        <Slider {...settings}>{children}</Slider>

            {Array.isArray(children) && children?.length > 1 ? (
          <div>
            <div className="bg-palette-card absolute right-4 top-[45%] rounded-full bg-gray-100 p-1 text-[0.8rem] shadow-lg drop-shadow-lg md:right-1 md:text-[1.8rem]">
              <HiOutlineChevronRight style={{ color: 'gray' }} />
            </div>
            <div className="bg-palette-card absolute left-4 top-[45%] rounded-full bg-gray-100 p-1 text-[0.8rem] shadow-lg drop-shadow-lg md:-left-1 md:text-[1.8rem]">
              <HiOutlineChevronLeft style={{ color: 'gray' }} />
            </div>
          </div>
        ) : (
          ''
        )} 

      </div>
    </div>
  );
};

export default CarouselBox;
