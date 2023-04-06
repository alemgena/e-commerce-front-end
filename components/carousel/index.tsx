import React from 'react';
import Link from 'next/link';
import { NextArrow, PrevArrow } from './Arrows';
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
  const settings = {
    className: ` px-4 ${full ? 'bg-palette-fill' : 'bg-[#37bccef9]'}`,
    infinite: true,
    speed: 600,
    centerPadding: '60px',
    slidesToShow: 5,
    slidesToScroll: 5,
    // initialSlide: 0,
    swipeToSlide: true,
    // rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          slidesToShow: 1,
          slidesToScroll: 1,
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
      className={` w-[85%]bg-blue-100 relative h-[50vh] bg-cover bg-center md:h-[70vh] bg-no-repeat${
        full ? 'flex-col' : 'bg-[#37bccef9]'
      }`}
    >
      <div
        className={`flex flex-grow flex-col items-center justify-around rounded-md bg-cover  bg-center bg-no-repeat text-sm backdrop-blur-md sm:text-base ${className}`}
      >
        <h2
          className={`text-lg  font-bold sm:text-xl ${
            full
              ? 'text-palette-base self-start'
              : 'text-palette-primary text-center'
          } `}
        >
          {`${title}`}
        </h2>
        {!full ? (
          <Link href={`/offers`}>
            <a className="text-palette-primary/80 bg-palette-card/80 -mb-4 block rounded-lg px-6 py-2 text-sm font-bold shadow-lg backdrop-blur-[10px] backdrop-filter dark:text-rose-300">
              see all
            </a>
          </Link>
        ) : null}
      </div>
      <div
        className={`relative ${
          full
            ? 'mt-4 w-full'
            : 'w-[65%] overflow-x-hidden sm:w-[65%] md:w-[75%]'
        }`}
      >
        <Slider {...settings}>{children}</Slider>

        <div>
          <div
            className="bg-palette-card absolute right-4 top-[45%] rounded-full bg-gray-100 p-1 
          text-[0.8rem] shadow-lg drop-shadow-lg md:right-1 md:text-[1.8rem]"
          >
            <HiOutlineChevronRight style={{ color: 'gray' }} />
          </div>
          <div className="bg-palette-card absolute left-4 top-[45%] rounded-full bg-gray-100 p-1 text-[0.8rem] shadow-lg drop-shadow-lg md:-left-1 md:text-[1.8rem]">
            <HiOutlineChevronLeft style={{ color: 'gray' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselBox;
