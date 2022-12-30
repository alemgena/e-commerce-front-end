/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { BsHeart } from 'react-icons/bs';
// import StarRatingComponent from 'react-star-rating-component';
// import Image from 'next/image';
import Link from 'next/link';

// import ProductPrice from '../ProductPrice';
import CardActions from './CardActions';

interface Props {
  product: IProduct;
}
export interface IProduct {
  image: any;
  name: string;

  price: number;
  discount?: number;

  brand: string;
  category: string[];
  isOffer?: boolean;
  registerDate?: string;
  timeStamp?: number;
  starRating: number;
}

const Card = () => (
  <div className="bg-palette-card relative col-span-6 my-1 flex rounded-xl shadow-xl ltr:mr-2 rtl:ml-1 sm:col-span-3 md:col-span-4  md:my-4 md:mx-6 lg:col-span-3 2xl:col-span-2">
    <Link href="/products/index">
      <div className="w-full flex-shrink-0">
        <img
          src="/images/NoPath - Copy (3).png"
          className="h-52 w-full object-cover"
        />
        <div className="bg-white">
          <div className="flex flex-col gap-3 p-2">
            <h6 className="text-sm text-gray-500">Samsung A51</h6>
            <div className="flex items-center justify-between">
              <h6 className="font-roboto-bold ">19,450 ETB</h6>
              <h6 className="rounded-full bg-gray-100 px-3 py-1">Used</h6>
            </div>
          </div>
          <div className="h-0.5 w-full bg-gray-200" />
          <div className="flex  gap-6  rounded-md p-2 font-roboto-light">
            <button className=" rounded-full bg-blue-800 px-3 py-2 text-sm text-white">
              Make Offer
            </button>

            <button className="flex flex-grow items-center justify-center  font-roboto-light text-xl text-gray-400">
              <BsHeart />
            </button>
          </div>
        </div>
      </div>
    </Link>

    {/* <CardActions product={product} /> */}
  </div>
);

export default Card;
