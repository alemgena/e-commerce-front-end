/* eslint-disable react/function-component-definition */
import React from 'react';
import Link from 'next/link';

interface Props {
  ID?: number;
  title: string;
  description: string;
  bgImg: string;
  url: string;
}
const Slide: React.FC<Props> = ({ title, description, bgImg, url }) => (
  <div
    className="relative mx-10 mt-10 h-[20vh] w-[100%] bg-cover bg-center bg-no-repeat md:h-[20vh]"
    style={{ backgroundImage: `${bgImg}` }}
  />
);

export default Slide;
