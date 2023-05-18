/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import { BsHeart } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import Head from 'next/head';
import Link from 'next/link';
import { GET_FAVOURITE } from '@/types';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { baseURL } from '@/config';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import { favoriteAction } from '@/store/favorite';
import Norecords from '@/components/Ui/Norecords';
import { IoIosArrowBack } from 'react-icons/io';
function Favorite() {
  const router = useRouter();
  const favorite = useSelector((state: RootStateOrAny) => state.favorite);
  console.log('favorite', favorite);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: GET_FAVOURITE, config: config });
  }, []);

  useEffect(() => {
    if (favorite.viewFavouritError) {
      dispatch(favoriteAction.setFavouriteError(''));
    }
  }, [favorite.viewFavouritError]);
  return (
    <ProtectedRoute>
      <Head>
        <title>Favorite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50 px-4 pb-32 md:px-12">
        <div
          onClick={() => router.push('/')}
          className="mb-4 flex items-center gap-2 py-4 text-xl hover:cursor-pointer"
        >
          <IoIosArrowBack />
          <h2 className="font-roboto-medium">Favorite</h2>
        </div>
        {favorite.products.data ? (
          <div className="mt-4 flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorite.products.data.length ? (
                <>
                  {favorite.products.data.map((data: any) => (
                    <Link
                      key={data.product?._id}
                      href={`/products/${data.product?.id}`}
                    >
                      <div key={data._id} className="w-full flex-shrink-0">
                        <div className="flex cursor-pointer flex-row">
                          <img
                            src={`${baseURL}/${data.product?.imagesURL[0]}`}
                            className="h-52 w-full object-cover"
                          />
                          <div className="-ml-10 mt-4 h-7 w-8 rounded-full bg-white ">
                            <MdDelete className="mx-1 my-1" size={23} />
                          </div>
                        </div>

                        <div className="bg-white">
                          <div className="flex flex-col gap-3 p-2">
                            <h6 className="text-sm text-gray-500">
                              {data.product?.name}
                            </h6>
                            <div className="flex items-center justify-between">
                              <h6 className="font-roboto-bold ">
                                {data.product?.price}
                              </h6>
                              <h6 className="rounded-full bg-gray-100 px-3 py-1">
                                Used
                              </h6>
                            </div>
                          </div>
                          <div className="h-0.5 w-full bg-gray-200" />
                          <div className="font-roboto-light flex gap-6 rounded-md p-2">
                            <button className="rounded-full bg-blue-800 px-3 py-2 text-sm text-white">
                              Make Offer
                            </button>

                            <button className="font-roboto-light flex items-center justify-center text-xl text-gray-400">
                              <BsHeart />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <Norecords />
              )}
            </div>
          </div>
        ) : (
          <Norecords />
        )}
      </div>
    </ProtectedRoute>
  );
}

export default Favorite;
