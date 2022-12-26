/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { BsHeart } from 'react-icons/bs';
import Link from 'next/link';

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

function Featured() {
  // const { width } = useWindowDimensions();
  // const numProductToShow = width >= 1536 ? 12 : 8;

  return (
    <div className=" bg-white px-12 pb-20 pt-10">
      <h2 className="rounded-md  bg-white py-3 pl-2 font-bold shadow-sm">
        FEATURED PRODUCTS
      </h2>
      <div className="flex flex-col gap-8">
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => (
            <Link href={`/products/${index}`}>
              <div key={data.toString()} className="w-52 flex-shrink-0">
                <img
                  src="/images/NoPath - Copy (15)-3.png"
                  className="h-52 w-full object-cover"
                />
                <div className="bg-white">
                  <div className="flex flex-col gap-3 p-2">
                    <h6 className="text-sm text-gray-500">Samsung A51</h6>
                    <div className="flex items-center justify-between">
                      <h6 className="font-roboto-bold ">19,450 ETB</h6>
                      <h6 className="rounded-full bg-gray-100 px-3 py-1">
                        Used
                      </h6>
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-gray-200" />
                  <div className="font-roboto-light  flex  gap-6 rounded-md p-2">
                    <button className=" rounded-full bg-blue-800 px-3 py-2 text-sm text-white">
                      Make Offer
                    </button>

                    <button className="font-roboto-light flex flex-grow items-center  justify-center text-xl text-gray-400">
                      <BsHeart />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;
