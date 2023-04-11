import React from 'react';
import Link from 'next/link';
import { baseURL } from '@/config';
interface Props {
 
  slideContent:PropsContent
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
        className={` h-[30vh] w-[100%]  md:h-[30vh]`}
      >
        <div className="mx-auto flex h-full w-3/4 flex-col items-center justify-center md:flex-row md:items-center md:justify-center">
         <div className="relative flex w-full max-w-xl items-center bg-white">
        <img
          src={`${baseURL}/${slideContent.photo}`}
          className='h-52'
        />
        </div>
        </div>
      </div>
    </>
  );
};

export default Slide;
