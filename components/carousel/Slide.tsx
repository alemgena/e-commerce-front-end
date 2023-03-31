import React from 'react';
import Link from 'next/link';
import { BsHeart } from 'react-icons/bs';
import { Url } from '@/utils/url';
const CarouselBoxCard: any = (product: any) => {
  return (
    <div className="md:w-3/2 mt-100 my-2 h-full w-full px-2">
      <>
        <Link href={`/products/${product.product?.id}`} passHref>
          <div
            key={product.product.toString()}
            className="bg-palette-card/80 flex w-full flex-col rounded-md p-3 shadow-lg backdrop-blur-[10px] backdrop-filter"
          >
            <div className="flex-grow text-center">
              <img
                key={product.product.id}
                src={`${Url}${product.product?.imagesURL[0]}`}
                className="h-32 w-full rounded-md object-cover !p-2 transition-transform hover:scale-105 sm:h-48 md:h-64"
              />
            </div>
            <div className="bg-white">
              <div className="flex flex-col gap-3 p-2">
                <h6 className="text-sm text-gray-500">
                  {product.product.name}
                </h6>
                <div className="flex items-center justify-between">
                  <h6 className="font-roboto-bold ">
                    ETB {product.product?.price}
                  </h6>
                  <h6 className="rounded-full bg-gray-100 px-3 py-1">Used</h6>
                </div>
              </div>
              <div className="h-0.5 w-full bg-gray-200" />
              <div className="font-roboto-light  flex  gap-6 rounded-md p-2">
                <Link href="/chat">
                  <button className="mt-3 flex-grow rounded-full bg-blue-800 py-2 text-white md:mt-0">
                    Offer
                  </button>
                </Link>

                <button className="font-roboto-light flex flex-grow items-center  justify-center text-xl text-gray-400">
                  <BsHeart className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </>
    </div>
  );
};

export default CarouselBoxCard;
