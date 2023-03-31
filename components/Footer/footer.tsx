import React from 'react';
import { IoIosMail, IoMdCall } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';

function Footer() {
  var currentTime = new Date();
  var year = currentTime.getFullYear();

  return (
    <div className="m-2 rounded-lg bg-white font-sans shadow md:m-4">
      <div className="container mx-auto ml-10 w-full p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6  md:grid-cols-3  lg:grid-cols-5">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-primary-900">
              Company
            </h2>
            <ul className="text-primary-600">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  About us
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  About us
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  About us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase text-primary-900 sm:text-sm">
              Contact us
            </h2>
            <ul className="text-primary-600">
              <li className="mb-2 sm:mb-4">
                <a
                  href="#"
                  className="flex items-center justify-start gap-x-2 hover:underline sm:gap-x-4"
                >
                  <span>
                    <IoMdCall size={16} className="sm:text-xl" />
                  </span>
                  <span className="text-xs sm:text-base">251946841922</span>{' '}
                </a>
              </li>
              <li className="mb-2 sm:mb-4">
                <a
                  href="#"
                  className="flex items-center justify-start gap-x-2 hover:underline sm:gap-x-4"
                >
                  <span>
                    <IoIosMail size={16} className="sm:text-xl" />
                  </span>
                  <span className="text-xs sm:text-base">
                    support@liyumarket.com
                  </span>
                </a>
              </li>
              <li className="mb-2 sm:mb-4">
                <a
                  href="#"
                  className="flex items-center justify-start gap-x-2 hover:underline sm:gap-x-4"
                >
                  <span>
                    <IoLocationSharp size={16} className="sm:text-xl" />
                  </span>
                  <span className="text-xs sm:text-base">
                    Country Tower 3rd Floor Piyassa
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 w-11/12 ">
            <h2 className="mb-6 text-sm font-semibold uppercase text-primary-900">
              Download on{' '}
            </h2>
            <div className=" grid grid-cols-1  gap-4 md:grid-cols-2 ">
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-white">
                <svg viewBox="30 336.7 120.9 129.2" width="24">
                  <path
                    fill="#FFD400"
                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                  />
                  <path
                    fill="#FF3333"
                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                  />
                  <path
                    fill="#48FF48"
                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                  />
                  <path
                    fill="#3BCCFF"
                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                  />
                </svg>
              </div>
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black  p-2 text-white">
                <svg viewBox="0 0 384 512" width="24">
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full items-center justify-between p-4 md:flex md:p-6">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          All rights are reserved! | Liyu Market {year}
        </span>

        <ul className="mt-3 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
