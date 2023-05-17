/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import { BsEye } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import Head from 'next/head';
import Link from 'next/link';
import { baseURL } from '@/config';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import Norecords from '@/components/Ui/Norecords';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import Notify from '@/components/Ui/Notify';
import { useAppSelector } from '@/store';
import { selectCurrentUser } from '@/store/auth';
import timeSince from '@/lib/types/time-since';
import NumberWithCommas from '@/lib/types/number-commas';
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
function MyProducts() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductDta] = useState<any>([]);
  const { NotifyMessage, notify, setNotify } = Notify();
  const { user, token } = useAppSelector(selectCurrentUser);
  const [open, setOpen] = React.useState(false);
  const [itemTobeDelete, setItemTObeDeleted] = useState('');
  console.log('itemTobeDelete'), itemTobeDelete;
  const handleClickOpen = (Id: string) => {
    setItemTObeDeleted(Id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (pId: string) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`${baseURL}api/products/${pId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          NotifyMessage({
            message: 'Product is deleted',
            type: 'success',
          });
        }
      })
      .catch((error) => {
        NotifyMessage({
          message: error.message,
          type: 'error',
        });
      });

    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${baseURL}api/products?filters=[{"seller":${JSON.stringify(
            user?.user?._id
          )}}]`
        );
        if (data) {
          setLoading(false);
          setProductDta(data.data);
        }
        if (data) {
          setLoading(false);
          setProductDta(data.data);
        }
      } catch (error: any) {
        setLoading(false);
        NotifyMessage({
          message: error.message,
          type: 'error',
        });
      }
    }

    fetchData();
  }, [user]);

  console.log('product data', productData[0]);
  return (
    <ProtectedRoute>
      <Head>
        <title>My Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50 px-4 pb-32 md:px-12">
        <div
          onClick={() => router.push('/')}
          className="mb-4 flex items-center gap-2 py-4 text-xl hover:cursor-pointer"
        >
          <IoIosArrowBack />
          <h2 className="font-roboto-medium">My Products</h2>
        </div>
        {productData ? (
          <div className="mt-4 flex flex-col gap-8 ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productData?.length ? (
                <>
                  {productData.map((data: any) => (
                    <>
                      <div
                        key={data._id}
                        className="bg-palette-card/80 flex  w-full flex-shrink-0 flex-col 
                          rounded-md p-2 shadow-lg backdrop-blur-[10px]
                           backdrop-filter"
                      >
                        <Link key={data?._id} href={`/products/${data?.id}`}>
                          <div className="flex cursor-pointer flex-row">
                            <img
                              src={`${baseURL}/${data?.imagesURL[0]}`}
                              className="h-52 w-full object-cover"
                            />
                          </div>
                        </Link>

                        <div className="bg-gray-400 bg-white">
                          <div className="flex flex-col gap-3 p-2">
                            <h6 className="text-sm text-gray-500">
                              {data?.name}
                            </h6>
                            <div className="flex items-center justify-between">
                              <h6 className="font-roboto-bold ">
                                {NumberWithCommas(data?.price)} ETB
                              </h6>
                              <h6 className="flex rounded-full bg-gray-100 px-3 py-1">
                                {data?.viewCount}{' '}
                                <BsEye className="ml-1 mt-1" />
                              </h6>
                              <h1>{timeSince(data?.createdAt)}</h1>
                            </div>
                          </div>
                          <div className="h-0.5 w-full bg-gray-200" />
                          <div className="font-roboto-light flex gap-6 rounded-md p-2">
                            <h1 className="flex">
                              {' '}
                              <FiMapPin className="mr-1 mt-1" />
                              {data?.region}
                            </h1>
                            <button
                              onClick={() =>
                                router.push(`/sell/products/${data.id}/edit`)
                              }
                              className="flex text-xl font-bold text-blue-600"
                            >
                              <AiFillEdit size={24} className="" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleClickOpen(data?.id)}
                              className="flex text-xl font-bold text-red-600"
                            >
                              <AiTwotoneDelete size={20} className="mt-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <></>
                    </>
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
      {open && (
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Delete Product'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You Sure to Delete This Product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleDelete(itemTobeDelete)} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </ProtectedRoute>
  );
}

export default MyProducts;
