import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { RootStateOrAny, useSelector } from 'react-redux';
import MegaMenu from '../components/menu/MegaMenu';
import BannerImage from '../public/images/fashion-banner.webp';
import PageSpinner from '@/components/Ui/PageSpinner';
import Norecords from '@/components/Ui/Norecords';
import { baseURL } from '@/config';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { loginAction } from '@/store/login';
import { getSession, } from 'next-auth/client';
import { signIn, signOut, useSession } from 'next-auth/client';
import NextLink from 'next/link';
import axios from 'axios';
import Category from '../components/CategorySection';
import { GET_PRODUCTS_BY_FEATURED } from '@/types';
import { setCredentials } from '@/store/auth';
import { useAppDispatch } from '@/store';
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
  useEffect(() => {
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
            // loginAction.setIsUserLogged(true);
            localStorage.setItem('token', data.data.tokens.access.token);
            localStorage.setItem('userInfo', JSON.stringify(data.data));
          }
        } catch (error: any) {}
      }

      fetchData();
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
  return (
    <div className="flex justify-between gap-x-4 px-2 md:px-6">
      <div className=" hidden w-1/4 lg:block">
        <MegaMenu />
      </div>

      <div className="flex w-full flex-col lg:w-3/4">
        <div className="flex w-full justify-between gap-x-4">
          <div
            className="flex grow flex-col  rounded-md bg-cover bg-center p-10 shadow"
            style={{
              backgroundImage: 'url("/images/fashion-banner.webp")',
              backgroundPosition: 'center center',
            }}
          >
            <span className="font-sans-bold text-primary mt-8  text-4xl md:text-5xl">
              How to buy <br /> on Liyu?
            </span>
            <span className="mt-4 font-sans underline">Click here</span>
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
                      <div className="w-full rounded-lg bg-white font-sans shadow-md">
                        <a href="#">
                          <img
                            className="h-60 rounded-t-lg object-cover"
                            src={`${baseURL}/${ad.imagesURL[0]}`}
                            alt="product image"
                          />
                        </a>
                        {/* <span class="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
                          Sale
                        </span> */}
                        <div className="mt-4 px-5 pb-5">
                          <a href="#">
                            <h5 className="text-lg tracking-tight text-slate-900">
                              {ad.name}
                            </h5>
                          </a>

                          <div className="flex items-center justify-between">
                            <p>
                              <span className=" text-lg font-bold text-primary-900 lg:text-2xl">
                                ETB {ad.price}{' '}
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
  );
};
export default Index;
Index.getInitialProps = async (context: any) => {
  const session: any = await getSession(context);
  return { user: session };
};
