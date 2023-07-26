import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { BsHeart } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Notify from '@/components/Ui/Notify';
import axios from 'axios';
import { Url } from '@/utils/url';
import { baseURL } from '@/config';
import NextLink from 'next/link';
import PageSpinner from '@/components/Ui/PageSpinner';
import NumberWithCommas from '@/lib/types/number-commas';
const SearchPage = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { name } = router.query;
  const { NotifyMessage, notify, setNotify } = Notify();
  const [productData, setProductDta] = useState<any>([]);
  const [searchProductByName, setSearchProductByName] = useState(false);
  const [productByName, setProductByName] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${baseURL}api/subcategories/byName/${name}`
        );
        if (data.data.length > 0) {
          data.data.map((item: any) => {
            if (item.product.length > 0) {
              setLoading(false);
              setProductDta(data);
              setProductByName([]);
            } else {
              handleProductSearch();
              setSearchProductByName(true);
            }
          });
        }
      } catch (error: any) {
           handleProductSearch();
           setSearchProductByName(true);
        setLoading(false);
        NotifyMessage({
          message: error.message,
          type: 'error',
        });
      }
    }
    fetchData();
  }, [name]);
  const handleProductSearch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseURL}api/products/byName/${name}`);
      if (data) {
        setLoading(false);
        setProductByName(data);
      }
    } catch (error: any) {
   
      setProductByName([]);
      setLoading(false);
      NotifyMessage({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Search Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <div className=" min-h-[86vh] bg-gray-50 px-12  py-6">
          <div className="font-roboto-regular flex gap-2 rounded-md bg-white px-4 py-5 text-xl text-gray-400">
            <h4>Showing Result For</h4>
            <h4 className="text-gray-800">{name}</h4>
          </div>
          <div className="mt-10 flex gap-14">
            <div className="w-full">
              <h3 className="font-roboto-medium border-b text-xl leading-10">
                ALL PRODUCTS
              </h3>
              {productData.data && (
                <>
                  {productData.data.map((item: any) => (
                    <div className=" grid grid-cols-2 items-center justify-center gap-4 pb-8 sm:grid-cols-3 md:grid-cols-4">
                      {item.product?.map((data: any) => (
                        <>
                          {data.imagesURL.length > 0 && (
                            <NextLink href={`/products/${data.id}`} passHref>
                              <div className="flex w-full flex-col rounded-lg border border-gray-100 bg-white shadow-md">
                                <a
                                  className=" mx-1 mt-1 flex h-60 overflow-hidden rounded-xl"
                                  href="#"
                                >
                                  <img
                                    className="object-contain"
                                    src={`${baseURL}${data.imagesURL[0]}`}
                                    alt="product image"
                                    loading="lazy"
                                  />
                                </a>

                                <div className="mt-4 px-2 pb-2">
                                  <a href="#">
                                    <h5 className="text-xl font-bold tracking-tight text-slate-900">
                                      {data.name}
                                    </h5>
                                  </a>
                                  <div className="mb-2 mt-2 flex items-center justify-between">
                                    <p>
                                      <span className="text-sm text-slate-900">
                                        ETB
                                      </span>
                                      <span className="ml-2 text-xl font-bold text-slate-900">
                                        {NumberWithCommas(data.price)}{' '}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NextLink>
                          )}
                        </>
                      ))}
                    </div>
                  ))}
                </>
              )}
              <>
                {searchProductByName && productByName.data && (
                  <div className=" grid grid-cols-2 items-center justify-center gap-4 pb-8 sm:grid-cols-3 md:grid-cols-4">
                    {productByName?.data.map((data: any) => (
                      <>
                        {data.imagesURL.length > 0 && (
                          <NextLink href={`/products/${data.id}`} passHref>
                            <div className="flex w-full flex-col rounded-lg border border-gray-100 bg-white shadow-md">
                              <a
                                className=" mx-1 mt-1 flex h-60 overflow-hidden rounded-xl"
                                href="#"
                              >
                                <img
                                  className="object-contain"
                                  src={`${baseURL}${data.imagesURL[0]}`}
                                  alt="product image"
                                  loading="lazy"
                                />
                              </a>

                              <div className="mt-4 px-2 pb-2">
                                <a href="#">
                                  <h5 className="text-xl font-bold tracking-tight text-slate-900">
                                    {data.name}
                                  </h5>
                                </a>
                                <div className="mb-2 mt-2 flex items-center justify-between">
                                  <p>
                                    <span className="text-sm text-slate-900">
                                      ETB
                                    </span>
                                    <span className="ml-2 text-xl font-bold text-slate-900">
                                      {NumberWithCommas(data.price)}{' '}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </NextLink>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
