import React from 'react';
import Link from 'next/link';
import { IoSearchCircleOutline, IoSearchOutline } from 'react-icons/io5';

interface Props {
  ID?: number;
  title: string;
  description: string;
  bgImg: string;
  url: string;
}
const Slide: React.FC<Props> = ({ title, description, bgImg, url }) => {
  return (
    <>
      <div
        className={` h-[30vh] w-[100%] bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 bg-cover bg-center
         bg-no-repeat text-white md:h-[30vh]`}
        style={{ backgroundImage: `${bgImg}` }}
      >
        <div className="mx-auto flex h-full w-3/4 flex-col items-center justify-center md:flex-row md:items-center md:justify-center">
          <div className="relative flex w-full max-w-xl items-center bg-white">
            <input
              className="w-full rounded-none px-6 py-3 text-blue-800 focus:outline-none"
              type="text"
              placeholder="Search ..."
            />
            <button className="ml-2 mr-4 bg-white focus:outline-none ">
              <IoSearchOutline size={20} className="h-5 w-5 text-blue-900" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide;
