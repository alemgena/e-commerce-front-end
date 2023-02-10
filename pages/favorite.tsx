/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import { BsHeart } from 'react-icons/bs';
import React,{useEffect,useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import Head from 'next/head';
import Link from 'next/link';
import { GET_FAVOURITE } from '@/types';
import { useDispatch } from 'react-redux';
function FavoritePage() {
      const dispatch = useDispatch();
        useEffect(() => {
dispatch({type:GET_FAVOURITE})
        },[])
  return (
    <>
      <Head>
        <title>Favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="mb-4 flex items-center gap-2 py-4  text-xl">
          <FiArrowLeft />
          <h2 className="font-roboto-medium ">Favorites</h2>
        </div>

        <div className="mt-4 flex flex-col gap-8">
          <div className="flex w-full gap-4 ">
            {[1, 2, 3, 4, 5].map((data, index) => (
              <Link href={`/products/${index}`}>
                <div key={data.toString()} className="mr-9 w-72 flex-shrink-0">
                  <div className="flex flex-row">
                    <img
                      src="/images/NoPath - Copy (15)-3.png"
                      className="h-52 w-full object-cover"
                    />
                    <div className="-ml-10 mt-4 h-7 w-8 rounded-full bg-white ">
                      <MdDelete className="mx-1 my-1" size={23} />
                    </div>
                  </div>

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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoritePage;
