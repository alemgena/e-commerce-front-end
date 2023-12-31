import React from 'react';
import Link from 'next/link';
import { IoSearchCircleOutline, IoSearchOutline } from 'react-icons/io5';
import { baseURL } from '@/config';
interface Props {
  slideContent: PropsContent;
}
interface PropsContent {
  ID?: number;
  title: string;
  description: string;
  photo: string;
  link: string;
  slideContent: any;
}

const Slide: React.FC<Props> = ({ slideContent }) => {
  return (
    <>
      <div
        className={` h-[30vh] w-[100%]  bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 md:h-[30vh]`}
      >
        <div className=" mx-auto flex  h-full  flex-row flex-col items-center justify-between md:flex-row md:items-center md:justify-center">
          <div className=" mr-10 relative flex w-full max-w-xl items-center bg-white">
            <img src={`${baseURL}/${slideContent.photo}`} className="h-52" />
          </div>
          <div className="relative flex w-full max-w-xl items-center bg-white">
            <img src={`${baseURL}/${slideContent.photo}`} className="h-52" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide;
