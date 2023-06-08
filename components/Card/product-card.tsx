/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import { MapOutlined, Place } from '@mui/icons-material';
import { ReactChild } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiBuildings, BiHeartCircle, BiMap } from 'react-icons/bi';
import { FaHeart, FaStar, FaMapMarker } from 'react-icons/fa';
import { useRouter } from 'next/router';
import NumberWithCommas from '@/lib/types/number-commas';
import { baseURL } from '@/config';
import Link from 'next/link';
import { BsEyeFill, BsHeart } from 'react-icons/bs';

interface Props {
  description: string;
  title: string;
  views: any;
  imageUrl?: any;
  isFavorite?: boolean;
  className?: string;
  listType?: string;
  ref?: any;
  price: number;
  id: string;
  region: string;
}
function ProductCard(props: Props) {
  const {
    description,
    title,
    views,
    imageUrl,
    id,
    region,
    listType,
    ref,
    price,
  } = props;
  const list = listType ? listType : 'Grid';
  const router = useRouter();
  return list === 'Grid' ? (
    <div ref={ref} className="">
      <div className="md:w-3/2 mt-100 my-2 h-full w-full px-2">
        <>
          <div
            key={id}
            className="bg-palette-card/80 flex w-full flex-col rounded-md p-2 shadow-lg backdrop-blur-[10px] backdrop-filter"
          >
            <Link href={`/products/${id}`} passHref>
              <>
                <div
                  onClick={() => router.push(`/products/${id}`)}
                  className="bg-white hover:cursor-pointer"
                >
                  <div className="flex-grow text-center">
                    <img
                      key={id}
                      src={imageUrl}
                      className="w-100 h-32 rounded-md object-cover  transition-transform hover:scale-105 sm:h-48 md:h-64"
                    />
                  </div>

                  <div className="bg-white">
                    <div className="mx-auto flex flex-col gap-3">
                      <h6 className="p-2 text-sm text-gray-500">
                        {description}
                      </h6>
                      <div className="flex items-center justify-between">
                        <h6 className="font-roboto-bold p-2 text-blue-500">
                          ETB {NumberWithCommas(price)}
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
    </div>
  ) : (
    <>
      <div
        onClick={() => router.push(`/products/${id}`)}
        className="group relative z-0 mt-0 flex flex-col items-center rounded-lg border bg-white py-2 shadow-md hover:cursor-pointer hover:bg-blue-50 sm:flex-row"
      >
        <div className="mx-4 h-44 py-2 text-center sm:h-60 sm:w-1/3">
          <img
            key={id}
            src={imageUrl}
            className="mb-2 h-full w-full rounded-md object-cover sm:h-56 sm:rounded-none"
          />
        </div>
        <div className="flex flex-col justify-between px-4 py-2 sm:w-2/3">
          <div>
            <h1 className="text-lg font-bold text-black sm:text-2xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              {description}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <h1 className="text-sm font-bold text-blue-700 sm:text-lg">
              ETB {NumberWithCommas(price)}
            </h1>
            <div className="ml-2 mr-1 mt-2 flex items-center text-xs font-bold uppercase sm:text-sm">
              <BiMap className="font-semibold text-gray-600" />
              <div className="ml-1 truncate text-gray-600">
                {region}, Ethiopia
              </div>
            </div>
            <div className="mr-2 flex items-center">
              <div className="mx-2 mr-auto flex py-1 text-xs font-semibold uppercase sm:text-sm">
                <BsEyeFill
                  size={18}
                  className="mr-1 pt-1 font-semibold text-gray-600"
                />
                <span className=" mr-1 mt-0">{views}</span>
              </div>
              <span className="hidden text-xs font-semibold uppercase text-gray-600 sm:block">
                views
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
