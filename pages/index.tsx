import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import MegaMenu from '../components/menu/MegaMenu';
import BannerImage from '../public/images/fashion-banner.webp';
import PageSpinner from '@/components/Ui/PageSpinner';
import Norecords from '@/components/Ui/Norecords';
import { baseURL } from '@/config';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { loginAction } from '@/store/login';
import { getSession, useSession } from 'next-auth/client';
//import { signIn, signOut, useSession } from 'next-auth/client';
import NextLink from 'next/link';
import axios from 'axios';
import { Ur2 } from '@/utils/url';
import Category from '../components/CategorySection';
import { GET_PRODUCTS_BY_FEATURED } from '@/types';
type AdsProp = {
  name: string;
  url: string;
  price: string;
  qty: string;
  imagesURL: string[];
  id: string;
};
const Index = ({ user }) => {
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
            loginAction.setLoggedUser(data);
            loginAction.setIsUserLogged(true);
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
  const dispatch = useDispatch();
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
      <div className="mt-10 gap-x-4 sm:w-full sm:flex-col md:flex  md:flex-row md:items-start md:justify-between  md:overflow-hidden">
        {!md && (
          <div className=" mt-4 mb-10 w-1/3 sm:hidden md:ml-5 md:flex">
            <MegaMenu />
          </div>
        )}

        <div className="mr-6 flex w-11/12 flex-col">
          <div className="top-0 z-0 mt-4 flex justify-between gap-x-6">
            <div
              className="flex h-60 w-3/4 flex-col  rounded-md bg-cover bg-center p-10 shadow"
              style={{
                backgroundImage: 'url("/images/fashion-banner.webp")',
              }}
            >
              <span className="mt-8 mr-2 font-roboto-bold text-5xl text-primary">
                How to buy <br /> on Liyu?
              </span>
              <span className="mt-4 font-roboto-medium underline">
                Click here
              </span>
            </div>
            <div className=" h-60 w-1/4 rounded-md  bg-blue-800  shadow">
              <div className=" flex flex-col items-center justify-center p-6 text-center font-roboto-medium text-white">
                <span className="text-xl">Got something to sell?</span>
                <span
                  className="py-4"
                  onClick={() => router.push('/sell/products/create')}
                >
                  <FaCartPlus size={48} />
                </span>
                <span className="mb:8 text-center text-lg">
                  Post a product to sell For free!
                </span>
              </div>
            </div>
          </div>
          
          {md && 
          <div>
          <Category />
          </div>}
          <div className="mt-2 ml-10 flex flex-col">
            <div className="mb-5">
              <span className="font-roboto-bold text-2xl text-main-secondary">
                Trending products
              </span>
            </div>
            {isLoading ? (
              <PageSpinner />
            ) : (
              <span>
                {products.data && (
                  <div className=" mb-20 grid grid-cols-4 gap-4">
                    {products.data.map((ad: AdsProp, idx: number) => (
                      <div
                        key={idx.toString()}
                        className=" flex max-h-max w-full flex-col justify-between rounded-lg bg-white font-roboto-regular shadow"
                      >
                        <NextLink href={`/products/${ad.id}`} passHref>
                          <div className="relative">
                            <div className="absolute left-0 bottom-0 flex h-7 w-8 items-center justify-center rounded-tr-lg bg-main-secondary bg-opacity-80">
                              <span className="text-sm text-white">3</span>
                            </div>
                            <img
                              src={`${baseURL}/${ad.imagesURL[0]}`}
                              className="h-48 w-full rounded-t-lg object-cover object-center"
                              alt="phone"
                            />
                            <div className="absolute right-0 -bottom-6 mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
                              <AiOutlineHeart size={24} />
                            </div>
                          </div>
                        </NextLink>
                        <div className="flex flex-col px-4 pt-6 pb-6">
                          <span className="text-lg">{ad.name}</span>
                          <span className="text-base text-primary">
                            ETB {ad.price}
                          </span>
                        </div>
                      </div>
                    ))}
                    <span>{hasData && <Norecords col={5} />}</span>
                  </div>
                )}
              </span>
            )}
          </div>
        </div>



      </div>
  );
};
export default Index;
Index.getInitialProps = async (context: any) => {
  const session: any = await getSession(context);
  return { user: session };
};
