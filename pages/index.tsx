import React, { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { RootStateOrAny, useSelector } from 'react-redux';
//import MegaMenu from '../components/menu/MegaMenu';
import PageSpinner from '@/components/Ui/PageSpinner';
import Norecords from '@/components/Ui/Norecords';
import { baseURL } from '@/config';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { getSession } from 'next-auth/client';
import { useSession } from 'next-auth/client';
import NextLink from 'next/link';
import axios from 'axios';

import { GET_PRODUCTS_BY_FEATURED } from '@/types';
import { setCredentials } from '@/store/auth';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import dynamic from 'next/dynamic';
import CarouselBox from '@/components/carousel';
import CarouselBoxCard from '@/components/carousel/Slide';
import Carousel from '@/components/slide-show';
const MegaMenu = dynamic(() => import('../components/menu/MegaMenu'));
const Category = dynamic(() => import('../components/CategorySection'));
type AdsProp = {
  name: string;
  url: string;
  price: string;
  qty: string;
  imagesURL: string[];
  id: string;
};
const Index = ({ user }) => {
  const [session] = useSession();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [adds, setAdds] = useState<any>([]);
  //  const { logout } = useAppSelector(
  //    (state: RootState) => state.login
  //  );
  useEffect(() => {
    const logout=localStorage.getItem("logout")
    if(logout){
    if (user) {
      async function fetchData() {
        try {
          const { data } = await axios.get(
            `${baseURL}api/socials/google?access_token=${user.accessToken}`
          );
          if (data) {
            dispatch(
              setCredentials({
                user: data.data.user,
                token: data.data.tokens.access.token,
              })
            );
            localStorage.setItem('token', data.data.tokens.access.token);
            localStorage.setItem('userInfo', JSON.stringify(data.data));
          }
        } catch (error: any) {
          console.log(error);
        }
      }

      fetchData();
    }
  }
  }, [user]);
  const md = useMediaQuery({ query: '(max-width: 992px)' });
  const sm = useMediaQuery({ query: '(max-width: 576px)' });
  useEffect(() => {
    setLoading(true);
    async function fetchAdds() {
      try {
        const { data } = await axios.get(`${baseURL}api/advertisement`);
        setAdds(data.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    }
    fetchAdds();
  }, []);
  //
  const router = useRouter();
  const products = useSelector(
    (state: RootStateOrAny) => state.featuredProducts.featuredProducts
  );
  const { isLoading } = useSelector(
    (state: RootStateOrAny) => state.featuredProducts
  );
  const [hasData, setHasData] = useState(false);
  useEffect(() => {
    dispatch({ type: GET_PRODUCTS_BY_FEATURED, featured: true });
  }, []);
  useEffect(() => {
    if (products.data) {
      if (!products.data.length) setHasData(true);
    }
  }, [products.data]);
  //
  const data = [
    {
      createdAt: '2023-02-22T16:09:50.560Z',
      description: 'In good position',
      featured: false,
      id: '63f63e4e8a18255a545b7a51',
      imagesURL: [],
      location: {
        coordinates: [32.1234, 42.5678],
        type: 'Point',
      },
      name: 'Corolla',
      options: [],
      premium: false,
      price: 2000000,
      seller: {
        _id: '63efb08991a2c9ef77db4840',
        first_name: 'test1',
        last_name: 'test1',
        phone: '0905236095',
        auth_type: 'EMAIL',
      },
      state: 'ACTIVE',
      subcategory: {
        _id: '63f633428a18255a545b76e0',
        name: 'Cars',
        description: 'cars description',
        deletedAt: null,
        imageURL: ['https://example.com/cars.jpg'],
      },
      updatedAt: '2023-03-31T09:08:47.029Z',
      viewCount: 31,
      __v: 1,
    },
    // add more objects as needed
  ];

  return (
    <>
      <div
        className="mb-6 hidden w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500
         bg-cover bg-center bg-no-repeat text-white lg:block"
      >
        <Carousel />
      </div>
      <></>
      <div className="flex justify-between gap-x-4 px-2 md:px-6">
        <div className=" hidden w-1/4 lg:block">
          <MegaMenu />
        </div>

        <div className="flex w-full flex-col lg:w-3/4">
          <div className="flex w-full justify-between gap-x-4">
            <div
              onClick={() => router.push('/products')}
              className="flex cursor-pointer grow flex-col  rounded-md bg-cover bg-center  shadow"
            >
              <img
                className="h-56 w-full"
                src="/images/banner.png"
                alt="product image"
                loading="lazy"
              />
            </div>
            <div
              className=" hidden h-full w-1/4 cursor-pointer  rounded-md  bg-blue-800 shadow lg:block"
              onClick={() => router.push('/sell/products/create')}
            >
              <div className="flex h-full flex-col items-center justify-center border border p-4 font-sans text-white">
                <span className="text-center  text-xl">
                  Got something to sell?
                </span>
                <span className="py-4">
                  <FaCartPlus size={48} />
                </span>
                <span className="text-center text-lg">
                  Post a product to sell For free!
                </span>
              </div>
            </div>
          </div>

          <Category />

          {isLoading ? (
            <PageSpinner />
          ) : (
            <div className="mt-2 flex flex-col">
              <div className="my-3">
                <span className="font-roboto-bold text-main-secondary text-2xl">
                  Trending products
                </span>
              </div>

              <span>
                {products.data && (
                  <div className=" grid grid-cols-2 items-center justify-center gap-4 pb-8 sm:grid-cols-3 md:grid-cols-4">
                    {products.data.map((ad: AdsProp, idx: number) => (
                      <NextLink
                        key={idx.toString()}
                        href={`/products/${ad.id}`}
                        passHref
                      >
                        <div className="flex w-full flex-col rounded-lg border border-gray-100 bg-white shadow-md">
                          <a
                            className=" mx-1 mt-1 flex h-60 overflow-hidden rounded-xl"
                            href="#"
                          >
                            <img
                              className="object-cover"
                              src={`${baseURL}${ad.imagesURL[0]}`}
                              alt="product image"
                              loading="lazy"
                            />
                          </a>
                          <div className="mt-4 px-2 pb-2">
                            <a href="#">
                              <h5 className="text-xl font-bold tracking-tight text-slate-900">
                                {ad.name}
                              </h5>
                            </a>
                            <div className="mb-2 mt-2 flex items-center justify-between">
                              <p>
                                <span className="text-sm text-slate-900">
                                  ETB
                                </span>
                                <span className="text-xl  font-bold text-slate-900">
                                  {ad.price}{' '}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </NextLink>
                    ))}

                    {hasData && (
                      <span>
                        {' '}
                        <Norecords col={5} />
                      </span>
                    )}
                  </div>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Index;
Index.getInitialProps = async (context: any) => {
  const session: any = await getSession(context);
  return { user: session };
};
