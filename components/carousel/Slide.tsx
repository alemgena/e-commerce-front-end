import React from 'react';
import Link from 'next/link';
import { BsHeart } from 'react-icons/bs';
import { Url } from '@/utils/url';
import NumberWithCommas from '@/lib/types/number-commas';
import router, { useRouter } from 'next/router';
const CarouselBoxCard: any = (product: any) => {
  const router = useRouter();
  return (
    <div className="md:w-3/2 mt-100 my-2 h-full w-full px-2">
      <>
        <div
          key={product.product.toString()}
          className="bg-palette-card/80 flex w-full flex-col rounded-md p-2 shadow-lg backdrop-blur-[10px] backdrop-filter"
        >
          <Link href={`/products/${product.product?.id}`} passHref>
            <>
              <div
                onClick={() => router.push(`/products/${product.product?.id}`)}
                className="hover:cursor-pointer"
              >
                <div className="flex-grow text-center">
                  <img
                    key={product.product.id}
                    src={`${Url}${product.product?.imagesURL[0]}`}
                    className="h-32 w-full rounded-md object-cover  transition-transform hover:scale-105 sm:h-48 md:h-64"
                  />
                </div>

                <div className="bg-white">
                  <div className="mx-auto flex flex-col gap-3">
                    <h6 className="p-2 text-sm text-gray-500">
                      {product.product.name}
                    </h6>
                    <div className="flex items-center justify-between">
                      <h6 className="font-roboto-bold p-2">
                        ETB {NumberWithCommas(product.product?.price)}
                      </h6>
                      <h6 className="mr-1 rounded-full bg-gray-100 px-4 py-1">
                        Used
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </Link>

          <div className="h-0.5 w-full bg-gray-200" />
          <div className="font-roboto-light mb-2  flex  gap-6 rounded-md p-2">
            <Link href="/chat">
              <button className=" flex-grow rounded-full bg-blue-800 py-2 text-white md:mt-0">
                Offer
              </button>
            </Link>
            <button className="font-roboto-light flex flex-grow items-center  justify-center text-xl text-gray-400">
              <BsHeart className="text-gray-400" />
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default CarouselBoxCard;
