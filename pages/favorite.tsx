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
import ProtectedRoute from '@/components/protected/protected';
import { favoriteAction } from '@/store/favorite';
import Norecords from '@/components/Ui/Norecords';
import ConfirmDialog from '../components/Ui/ConfirmDialog';
import axios from 'axios';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import { IoIosArrowBack } from 'react-icons/io';
function FavoritePage() {
  const router = useRouter();
  let favorite = useSelector((state: RootStateOrAny) => state.favorite);
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
      router.push('/');
      dispatch(favoriteAction.setFavouriteError(null));
    }
  }, [favorite.viewFavouritError]);
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    setProducts(favorite?.products?.data);
  }, [favorite.products]);
  const { NotifyMessage, notify, setNotify } = Notify();
  const [confirmDialog, setConfirmDialog] = useState<any>({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const removeProduct = async (event: string) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseURL}api/favorites/${event}`,
        config
      );
      if (data) {
        setProducts(products.filter((item: any) => item._id !== event));
        NotifyMessage({
          message: 'Successfully removed the product from favorite',
          type: 'success',
        });
      }
    } catch (error: any) {
      NotifyMessage({
        message: error.response.data.error.message,
        type: 'error',
      });
    }
  };
  return (
    <ProtectedRoute>
      <Head>
        <title>Favorite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <div className="mb-4 flex items-center gap-2 py-4  text-xl">
          <FiArrowLeft />
          <h2 className="font-roboto-medium ">Favorites</h2>
        </div>
        {favorite.products.data ? (
          <div className=" grid grid-cols-2 items-center justify-center gap-4 pb-8 sm:grid-cols-3 md:grid-cols-4">
            {products.length>0 ? (
              <>
                {products?.map((data: any) => (
                  <div
                    key={data.toString()}
                    className="mr-9 w-72 flex-shrink-0"
                  >
                    <div className="flex cursor-pointer flex-row">
                      <Link href={`/products/${data.product?.id}`}>
                        <img
                          src={`${baseURL}/${data.product?.imagesURL[0]}`}
                          className="h-52 w-full object-cover"
                        />
                      </Link>
                      <div className="-ml-10 mt-4 h-7 w-8 rounded-full bg-white ">
                        <MdDelete
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title:
                                'Are you sure to remove this product from favoriet?',
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                removeProduct(data._id);
                              },
                            });
                          }}
                          className="mx-1 my-1"
                          size={23}
                        />
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
                ))}
              </>
            ) : (
              <Norecords />
            )}
          </div>
        ) : (
          <Norecords />
        )}
      </div>
    </ProtectedRoute>
  );
}

export default FavoritePage;
