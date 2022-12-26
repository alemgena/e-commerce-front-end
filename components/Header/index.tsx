/* eslint-disable react/button-has-type */
import React from 'react';
// const UserBox = dynamic(() => import('../user'), {
//   ssr: false,
// });
import { BiCart, BiHeart, BiMessage } from 'react-icons/bi';

import Menu from '../menu';

// import { AiFillPlusCircle } from 'react-icons/ai';
import Logo from './Logo';
import SearchBar from './SearchBar';

const index = () => (
  <header className="md:bg-palette-fill left-0 right-0 top-0 z-[1000] pt-4 shadow-sm md:fixed">
    <div className="mb-2 flex flex-col md:px-4">
      <div className="relative flex items-center justify-between md:order-2  md:mt-2">
        <Menu />
        <div className="md:hidden">
          <Logo />
        </div>
        {/* 👈settings: md:hidden */}
        <div className="hidden md:flex md:items-center md:justify-between" />
      </div>
      <hr className="md:hidden" />
      <div className="mb-2 mt-4 flex items-center  md:order-1 md:mt-0">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="flex-grow">
          <SearchBar />
        </div>
        <div
          className=" mr-16 flex flex-row
                       items-center justify-center"
        >
          <button
            type="button"
            className="round-40 mr-20
            mb-2
            flex
            flex-row
            items-center justify-center rounded-full  bg-blue-800 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  px-5 py-2.5 text-center text-sm text-sm font-medium text-white text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Sell Now
          </button>

          <button
            className=" mr-18  relative rounded-full border-2 border-transparent py-4 px-1 text-gray-800 transition duration-150 ease-in-out hover:text-gray-400 focus:text-gray-500 focus:outline-none"
            aria-label="Message"
          >
            <BiMessage size={34} />
            <span className="absolute inset-0 -mr-6 object-right-top">
              <div className="inline-flex items-center rounded-full border-2 border-white bg-blue-500 px-1.5 py-0.5 text-xs font-semibold leading-4 text-white">
                6
              </div>
            </span>
          </button>

          <button
            className="mr-18  relative rounded-full border-2 border-transparent py-4 px-1 text-gray-800 transition duration-150 ease-in-out hover:text-gray-400 focus:text-gray-500 focus:outline-none"
            aria-label="Message"
          >
            <BiCart size={34} />
            <span className="absolute inset-0 -mr-6 object-right-top">
              <div className="inline-flex items-center rounded-full border-2 border-white bg-blue-500 px-1.5 py-0.5 text-xs font-semibold leading-4 text-white">
                6
              </div>
            </span>
          </button>
          <button
            className="mr-13 relative rounded-full border-2 border-transparent py-4 px-1 text-gray-800 transition duration-150 ease-in-out hover:text-gray-400 focus:text-gray-500 focus:outline-none"
            aria-label="Message"
          >
            <BiHeart size={34} />
          </button>
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <svg
              className="absolute -left-1 h-12 w-12 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* <button
            type="button"
            className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin= "round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Buy now
          </button> */}
        </div>

        <div className="flex items-center justify-between ltr:ml-2 rtl:mr-2 sm:ltr:ml-4 sm:rtl:mr-4 ">
          {/* <UserBox /> */}
        </div>
      </div>
    </div>
  </header>
);

export default index;
