import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { BsHeart } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';
import PageSpinner from '@/components/Ui/PageSpinner';
import { baseURL } from '@/config';
import Norecords from '@/components/Ui/Norecords';
import Notification from '@/components/Ui/Notification';
import Notify from '@/components/Ui/Notify';
import NextLink from 'next/link';
const ProdcutPage = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { name } = router.query;
  const { NotifyMessage, notify, setNotify } = Notify();
  const [productData, setProductDta] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${baseURL}api/products?filters=[{"region":${JSON.stringify(name)}}]`
        );
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
  }, [name]);
  return (
    <>
      <Head>
        <title>Filter Product By Region</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <div className=" min-h-[86vh] bg-gray-50 py-6 px-4  md:px-12">
          <Notification notify={notify} setNotify={setNotify} />
          <div className="font-roboto-regular flex gap-2 rounded-md bg-white px-4 py-5 text-xl text-gray-400">
            <h4>Showing Result For </h4>
            <h4 className="text-gray-800">{name}</h4>
          </div>
          <div className="w-full">
            <h3 className="font-roboto-medium border-b text-xl leading-10">
              ALL PRODUCTS
            </h3>
            {productData.length ? (
              <div className="mt-8 grid grid-cols-3 gap-8">
                {productData?.map((data: any) => (
                  <NextLink href={`/products/${data.id}`} passHref>
                    <div key={data.toString()} className="w-full">
                      <img
                        src={`${baseURL}/${data.imagesURL[0]}`}
                        className="h-52 w-full object-cover"
                      />
                      <div className="bg-white">
                        <div className="flex flex-col gap-3 p-2">
                          <h6 className="text-sm text-gray-500">{data.name}</h6>
                          <div className="flex items-center justify-between">
                            <h6 className="font-roboto-bold ">{data.price}</h6>
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
                  </NextLink>
                ))}
              </div>
            ) : (
              <Norecords col={5} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProdcutPage;
