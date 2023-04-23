/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import {
  Star,
  HeartBroken,
  BuildCircleRounded,
  PriceChange,
  Payment,
} from '@mui/icons-material';
import { ReactChild } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiBuildings, BiHeartCircle } from 'react-icons/bi';
import { FaHeart, FaStar } from 'react-icons/fa';
import NumberWithCommas from '@/lib/types/number-commas';
interface Color {
  className: string;
  boxColor: string;
  buttonColor: string;
  borderColor: string;
  shadowColor?: string;
}
interface Props {
  description: string;
  title: string;
  isOnline: boolean;
  onFavorite: any;
  onApply: any;
  views: number;
  icon?: ReactChild;
  color?: Color;
  rate: number;
  isFavorite?: boolean;
  className?: string;
  listType?: string;
  ref?: any;
  price: number;
  favoriteLoading?: boolean;
}
function ServiceCard(props: Props) {
  const {
    description,
    title,
    isOnline,
    onFavorite,
    onApply,
    views,
    icon,
    color,
    rate,
    isFavorite,
    className,
    listType,
    ref,
    favoriteLoading,
    price,
  } = props;
  const list = listType ? listType : 'Grid';
  return list === 'Grid' ? (
    <div ref={ref} className="">
      <div className={`group rounded-md`}>
        {/*hover:z-50   hover:delay-1000   lg:hover:scale-125 */}
        <div className={`relative h-20 `}>
          <div
            className={`absolute -top-5 z-40 flex w-full items-center justify-center `}
          >
            <div
              className={`m-6 flex h-20 w-20 items-center justify-center rounded-full   text-white ${color?.className} shadow-xl`}
            >
              {icon}
            </div>
          </div>
          <div
            onClick={() => onFavorite()}
            className={`visible absolute right-2 top-12 z-40 flex  cursor-pointer  px-2 ${
              isFavorite ? '' : 'lg:invisible lg:group-hover:visible'
            }`}
          >
            <div className="space-y-3">
              {favoriteLoading ? (
                <div
                  className={` flex h-10 w-10  items-center justify-center rounded-full `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: 'block' }}
                    width="20px"
                    height="20px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="#1af9dd"
                      strokeWidth="10"
                      r="35"
                      strokeDasharray="164.93361431346415 56.97787143782138"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                      />
                    </circle>
                  </svg>
                </div>
              ) : (
                <div
                  className={` flex h-10 w-10  items-center justify-center rounded-full `}
                >
                  <BiHeartCircle
                    className={`${isFavorite ? 'fill-red-400' : 'white'}`}
                    strokeWidth={'1.25'}
                    color={'red'}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className={`visible absolute left-2 top-12 z-40 flex cursor-pointer px-2 sm:opacity-100`}
          >
            <div className="space-y-3">
              <div
                className={` flex h-10 w-10 items-center justify-center space-x-1 rounded-full text-sm text-gray-500 `}
              >
                <AiOutlineEye />
                <Typography className="text-sm">{views}</Typography>
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-0 h-10 w-full rounded-t-lg  bg-white group-hover:shadow-lg ${className}`}
          ></div>
        </div>

        <div
          className={`relative h-80 flex-col ${color?.shadowColor} rounded-b-lg  bg-white p-4 pt-10 group-hover:shadow-lg ${className}`}
        >
          <div className="flex justify-between">
            <div>
              <div className=" mb-2 mt-1">
                <Typography
                  className="cursor-pointer text-sm  font-bold capitalize hover:text-sky-700"
                  style={{ fontFamily: 'Raleway' }}
                  onClick={() => onApply()}
                >
                  {title}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {isOnline ? (
              <div className="mb-4 flex items-center">
                <div className=" flex space-x-1">
                  <div className="h-3 w-3 self-center  rounded-full border border-solid border-gray-300 bg-green-500"></div>
                  <div className="inline-block align-middle text-xs">
                    Online
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4 flex items-center space-x-1">
                <div className="h-3 w-3 self-center  rounded-full border-2 border-solid border-gray-300 bg-gray-400 "></div>
                <div className="inline-block align-middle text-xs">Offline</div>
              </div>
            )}
            <div
              className={`mb-4 flex h-6 md:bg-white md:text-black ${color?.buttonColor}
              cursor-pointer items-center space-x-2 rounded-md border px-1 text-gray-500  group-hover:text-white md:group-hover:text-white ${color?.borderColor}`}
            >
              <span className="text-lg font-bold">ETB</span>
              <Typography className="text-xs">
                {NumberWithCommas(price)}
              </Typography>
            </div>
          </div>
          <Typography
            onClick={() => onApply()}
            className=" font-Raleway cursor-pointer text-slate-700 hover:text-sky-700"
            style={{
              fontFamily: 'Raleway',
            }}
          >
            {description}
          </Typography>
          {description?.length > 120 && (
            <Typography
              className="cursor-pointer hover:text-sky-700"
              onClick={() => onApply()}
            >
              Read more
            </Typography>
          )}
          <div className=" absolute bottom-3 right-0 flex w-full justify-center">
            <div className=" flex w-full justify-center">
              <div className="w-10/12">
                <div className=" flex justify-center space-x-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                      key={idx}
                      className="mr-1"
                      fill={`${
                        rate !== null
                          ? idx < props?.rate
                            ? 'orange'
                            : 'white'
                          : 'white'
                      }`}
                      color={`${
                        rate !== null
                          ? idx < props?.rate
                            ? 'orange'
                            : 'gray'
                          : 'gray'
                      }`}
                      strokeWidth={'1.25'}
                      width={16}
                      height={16}
                    />
                  ))}
                </div>
                <div
                  className={`mt-4 h-8  cursor-pointer rounded-md
                              border   ${color?.borderColor} ${color?.className} text-center text-sm text-white
                              md:bg-white md:text-black ${color?.buttonColor}
                              md:group-hover:text-white`}
                  onClick={() => onApply()}
                >
                  <span className="mt-1 inline-block align-bottom">Apply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="md:w-3/2 group relative flex h-40 w-full flex-col items-center rounded-lg border bg-white shadow-md md:flex-row">
      <div
        onClick={() => onFavorite()}
        className={` visible absolute top-2 z-40 flex w-full justify-start px-2 sm:opacity-100  ${
          isFavorite ? '' : 'lg:invisible lg:group-hover:visible'
        }`}
      >
        <div className="space-y-3">
          <div className="flex h-10 w-10  items-center justify-center rounded-full border border-solid border-gray-300">
            <FaHeart
              className={`${isFavorite ? 'fill-red-400' : 'white'}`}
              strokeWidth={'1.25'}
              color={'red'}
            />
          </div>
        </div>
      </div>
      <div
        className={`${color?.boxColor} flex h-full flex-col items-center rounded object-cover text-purple-500  md:w-64 md:rounded-none md:rounded-l-lg`}
      >
        <div className="flex w-full justify-end space-y-3 pr-2">
          <div
            className={` flex h-10 w-10 items-center justify-end space-x-1 rounded-full text-sm text-gray-500 `}
          >
            <AiOutlineEye />
            <Typography className="text-sm">{views}</Typography>
          </div>
        </div>
        <div
          className={`${color?.buttonColor} flex h-24 w-24 items-center justify-center rounded-full group-hover:text-white`}
        >
          {icon}
        </div>
      </div>
      <div className="relative flex h-full w-full flex-col space-y-1 p-2">
        <div className="flex w-full justify-between">
          <Typography
            className=" cursor-pointer font-bold capitalize text-gray-700 hover:text-sky-700 "
            style={{ fontFamily: 'Raleway' }}
            onClick={() => onApply()}
          >
            {title}
          </Typography>
          <div className="flex space-x-2 px-5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <FaStar
                key={idx}
                className="mr-1"
                fill={`${
                  rate !== null ? (idx < rate ? 'orange' : 'white') : 'white'
                }`}
                color={`${
                  rate !== null ? (idx < rate ? 'orange' : 'gray') : 'gray'
                }`}
                strokeWidth={'1.25'}
                width={16}
                height={16}
              />
            ))}
          </div>
        </div>
        <div className="mb-1 flex space-x-1">
          {isOnline ? (
            <div className="flex items-center">
              <div className=" flex space-x-1">
                <div className="h-3 w-3 self-center  rounded-full border border-solid border-gray-300 bg-green-500"></div>
                <div className="inline-block align-middle text-xs">Online</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 self-center  rounded-full border-2 border-solid border-gray-300 "></div>
              <div className="inline-block align-middle text-xs">Offline</div>
            </div>
          )}
        </div>
        <Typography
          className="cursor-pointer text-sm font-normal text-gray-700 hover:text-sky-700"
          onClick={() => onApply()}
          style={{
            fontFamily: 'Raleway',
          }}
        >
          {description}
        </Typography>
        <div className="absolute bottom-2 right-2">
          <div
            onClick={() => onApply()}
            className="invisible flex  items-center justify-center  group-hover:visible"
          >
            <div
              className={`cursor-pointer self-center rounded py-1
           text-center text-sm
              text-white contrast-150
               md:w-40 ${color?.buttonColor}`}
            >
              <span>Apply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
