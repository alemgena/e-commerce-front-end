import React from 'react';
import { IoIosMail, IoMdCall } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import PlaystoreSVG from './playstore-svg';
import AppStoreSVG from './appstore-svg';

function Footer() {
  let currentTime = new Date();
  const year = currentTime.getFullYear();

  return (
<<<<<<< HEAD
    <div className="mx-2 rounded-lg bg-white font-sans shadow ">
      <div className="container mx-auto w-full p-4 sm:p-6">
        <div className="md-w-2xl m-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2  lg:grid-cols-4">
          <div className="auto-cols-max">
=======
    <div className="m-2 rounded-lg  bg-white font-sans shadow md:m-4">
      <div className=" container mx-auto ml-2 flex w-full justify-center p-4 sm:block sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6  md:grid-cols-3  lg:grid-cols-4">
          <div>
>>>>>>> develop
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
<<<<<<< HEAD
          <div className="grow">
            <h2 className="mb-6 text-sm font-semibold uppercase text-primary-900">
              Contact us
            </h2>
            <ul className="text-primary-600">
              <li className="mb-4">
                <a
                  href="#"
                  className="flex items-center justify-start gap-x-4 hover:underline"
                >
                  <span>
                    <IoMdCall size={20} />
                  </span>
                  <span>251946841922</span>{' '}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="flex items-center justify-start gap-x-4 hover:underline"
                >
                  <span>
                    <IoIosMail size={20} />
                  </span>
                  <span>support@liyumarket.com</span>
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="flex items-center justify-start gap-x-4 hover:underline"
                >
                  <span>
                    <IoLocationSharp size={20} />
                  </span>
                  <span>Country Tower 3rd Floor Piyassa</span>
                </a>
              </li>
            </ul>
=======
          <div className="sm:mr-4 md:flex md:flex-row md:justify-between ">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-primary-900">
                Contact us
              </h2>
              <ul className="text-primary-600">
                <li className="mb-4">
                  <a
                    href="#"
                    className="flex items-center justify-start gap-x-4 hover:underline"
                  >
                    <span>
                      <IoMdCall size={20} />
                    </span>
                    <span>251946841922</span>{' '}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="#"
                    className="flex items-center justify-start gap-x-4 hover:underline"
                  >
                    <span>
                      <IoIosMail size={20} />
                    </span>
                    <span>support@liyumarket.com</span>
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="#"
                    className="flex items-center justify-start gap-x-4 hover:underline"
                  >
                    <span>
                      <IoLocationSharp size={20} />
                    </span>
                    <span>Country Tower 3rd Floor Piyassa</span>
                  </a>
                </li>
              </ul>
            </div>
>>>>>>> develop
          </div>
          <div className="col-span-1 md:col-span-2">
            <h2 className="mb-6 text-sm font-semibold uppercase text-primary-900">
              Download on{' '}
            </h2>
<<<<<<< HEAD
            <div className=" grid grid-cols-1  gap-4 md:col-span-full ">
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
=======
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-white sm:mr-4">
                <PlaystoreSVG />
>>>>>>> develop
                <div className="flex h-full flex-col justify-between uppercase">
                  <div className="text-xs">Get it on</div>
                  <div className="font-roboto -mt-1 text-sm font-bold">
                    Google Play
                  </div>
                </div>
              </div>

              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-white sm:mr-4">
                <AppStoreSVG />
                <div className="flex h-full flex-col justify-between">
                  <div className="text-xs">Download our App On</div>
                  <div className="mt-1 font-sans font-bold uppercase">
                    App Store
                  </div>
                </div>
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
