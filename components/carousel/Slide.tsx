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
    className="relative mx-10 mx-3 ml-96  -mb-10  mt-10  w-1/2  rounded-sm bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `${bgImg}` }}
  >
    <a
      className="ml-28 flex  flex-row items-end justify-start  gap-3 pb-20
      "
    >
      <div className="mb-5">
        <svg
          viewBox="0 0 500 500"
          xmlSpace="preserve"
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-9"
        >
          <polygon
            points="500,250 473.216,279.409 491.536,314.718 458.049,336.172 466.532,375.03 428.619,387.055     426.778,426.778 387.044,428.619 375.02,466.543 336.161,458.049 314.707,491.547 279.409,473.226 250,500 220.581,473.226     185.282,491.547 163.818,458.049 124.959,466.543 112.945,428.619 73.222,426.778 71.371,387.044 33.458,375.021 41.941,336.172     8.453,314.718 26.774,279.409 0,250 26.774,220.591 8.453,185.282 41.941,163.829 33.458,124.97 71.371,112.956 73.222,73.222     112.956,71.381 124.97,33.468 163.829,41.952 185.282,8.463 220.581,26.784 250,0 279.409,26.784 314.718,8.463 336.172,41.962     375.03,33.468 387.044,71.381 426.778,73.232 428.619,112.966 466.532,124.98 458.049,163.839 491.536,185.282 473.216,220.591       "
            style={{ fill: '#16C710' }}
          />
        </svg>
        <h1 className="-mt-16 ml-7 font-roboto-bold text-2xl text-white">
          {' '}
          15 %{' '}
        </h1>
      </div>

      <div className="flex flex-col">
        <h3 className="font-roboto-bold text-2xl text-white">
          Buy with Discount
        </h3>
        <p style={{ color: '#16C710' }} className="font-roboto-bold">
          Jackets,T-shirts,Bags
        </p>
      </div>
    </a>
  </div>
);

export default Slide;
