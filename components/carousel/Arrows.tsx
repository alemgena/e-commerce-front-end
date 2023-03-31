import React from 'react';

interface Props {
  className?: string;
  style?: any;
  onClick?: () => void;
}
export const NextArrow: React.FC<Props> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} hover:bg-palette-card/20 z-10 !flex h-full w-14  items-center justify-center
       drop-shadow-xl before:text-[20px] before:content-[''] ltr:-right-2 ltr:left-auto rtl:-left-2 rtl:right-auto
        lg:before:text-[40px]`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
export const PrevArrow: React.FC<Props> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} hover:bg-palette-card/20 z-10 !flex h-full w-14 items-center justify-center drop-shadow-lg before:text-[20px] before:content-[''] ltr:-left-5 ltr:right-auto rtl:-right-5 rtl:left-auto lg:before:text-[40px]`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
