import { useState, useEffect } from 'react';
import {
  BsChevronUp,
  BsEye,
  BsFillChatLeftTextFill,
  BsHeart,
  BsMap,
} from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { IoIosCall } from 'react-icons/io';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Disclosure } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ADD_PRODUCT_FAVORITE } from '@/types';
import { useRouter } from 'next/router';

/* import { Url } from '@/utils/url';
 */ import { baseURL } from '@/config';

import { RootStateOrAny, useSelector } from 'react-redux';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';
import React, { lazy, Suspense } from 'react';
import { GET_PRODUCT } from '@/types';
import PageSpinner from '@/components/Ui/PageSpinner';
import CarouselBox from '@/components/carousel';
import CarouselBoxCard from '@/components/carousel/Slide';
import NumberWithCommas from '@/lib/types/number-commas';
import timeSince from '@/lib/types/time-since';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import FormatNumber from '@/lib/types/number-format';
import { Avatar } from '@mui/material';
import { LocationCity, MapOutlined } from '@mui/icons-material';
import { MdLocationOn } from 'react-icons/md';
const Map = dynamic(() => import('@/components/map').then((mod) => mod.Map), {
  ssr: false,
});

<head></head>;
function ProductDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [activeImage, setActiveImage] = useState<any>([]);
  const [productImage, setProductImage] = useState();
  const [showContact, setShowContact] = useState(false);
  const productData = useSelector(
    (state: RootStateOrAny) => state.product.product
  );
  const products = useSelector(
    (state: RootStateOrAny) => state.products.products
  );
  //favorite
  const favorite = useSelector((state: RootStateOrAny) => state.favorite);
  const { isLoading } = useSelector((state: RootStateOrAny) => state.product);
  useEffect(() => {
    dispatch({ type: GET_PRODUCT, id: id });
  }, [id]);
  useEffect(() => {
    if (productData?.data?.imagesURL) {
      setProductImage(productData.data.product.imagesURL[0]);
      setActiveImage(productData.data.product.imagesURL);
    }
  }, []);
  const addFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const favorite = {
      product: id,
    };
    dispatch({ type: ADD_PRODUCT_FAVORITE, data: favorite, config: config });
    setSubmit(true);
  };
  const [submit, setSubmit] = useState(false);
  const { NotifyMessage, notify, setNotify } = Notify();
  useEffect(() => {
    if (favorite.error && submit) {
      NotifyMessage({
        message: favorite.error.message,
        type: 'error',
      });
    }
  }, [favorite.error]);
  useEffect(() => {
    if (favorite.favorite && submit) {
      NotifyMessage({
        message: 'product is add to favourite list',
        type: 'success',
      });
    }
  }, [favorite.favorite]);
  const filteredRelatedProducts = productData?.data?.relatedProducts.filter(
    (relatedProduct: any) => {
      return relatedProduct.id !== productData?.data?.product.id;
    }
  );
  console.log('fillll', filteredRelatedProducts);
  return (
    <>
      <Head>
        <title>Product Detail</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
        <meta
          property="og:description"
          content=" This is description of post"
        />
        <meta
          property="og:image"
          content="http://165.232.42.207:3000/images/images-1677299251760.jpg"
        ></meta>
      </Head>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <div className=" bg-gray-350 w-full overflow-x-hidden px-12 pb-32">
          <div className="flex flex items-center gap-2 py-4 text-xl  ">
            <h1
              onClick={() => router.push('/')}
              className=" flex text-center hover:cursor-pointer"
            >
              <FiArrowLeft className="ml-3 mt-1" />
              Product List
            </h1>
          </div>
          {productData.data && (
            <>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-3/4">
                  <img
                    src={`${baseURL}${productData?.data?.product?.imagesURL[0]}`}
                    className="w-full overflow-hidden rounded-sm object-cover"
                  />

                  <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {activeImage.length ? (
                      <>
                        {activeImage.map((image: any, index: number) => (
                          <img
                            key={index}
                            src={`${baseURL}${image}`}
                            className={`h-24 w-full cursor-pointer overflow-hidden rounded-sm object-cover sm:h-32 ${
                              activeImage.id === image.id &&
                              'ring-2 ring-blue-800'
                            } `}
                            onClick={() => setProductImage(image)}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        {productData.data.product.imagesURL.map(
                          (image: any, index: number) => (
                            <img
                              key={index}
                              src={`${baseURL}${image}`}
                              className={`h-24 w-full cursor-pointer overflow-hidden rounded-sm object-cover sm:h-32 ${
                                activeImage.id === image.id &&
                                'ring-2 ring-blue-800'
                              } `}
                              onClick={() => setProductImage(image)}
                            />
                          )
                        )}
                      </>
                    )}
                  </div>
                  <div className="aspect-w-16 aspect-h-9 relative z-0 mt-10 w-full overflow-hidden rounded-sm md:mt-6 md:w-full">
                    <Suspense fallback={<div>Loading...</div>}>
                      <Map center={[9.005401, 38.763611]} />
                    </Suspense>
                  </div>
                </div>
                {/* div two */}

                {/* div2 */}
                <div className="ml-2 w-full md:w-1/2">
                  <div className="md:w-3/2 flex w-full flex-col gap-6 ">
                    <div className="rounded-md bg-white px-4 py-6 shadow-sm">
                      <h2 className="text-xl  font-bold">
                        {`${productData?.data?.product?.name}`}
                      </h2>
                      <p className="mb-4 text-sm text-gray-500">
                        {productData?.data?.product?.subcategory?.name}{' '}
                      </p>
                      <h2 className="text-xl font-bold">
                        <span>ETB</span>{' '}
                        {NumberWithCommas(productData.data.product.price)}
                      </h2>
                      <h6 className="text-blue flex text-center font-bold ">
                        <IoCheckmarkCircleOutline className="mt-1" />
                        Posted {''}{' '}
                        {timeSince(productData?.data?.product?.createdAt)}{' '}
                      </h6>
                    </div>
                    <div className="rounded-md bg-white px-4 py-6 shadow-sm">
                      <h2 className="mb-4 text-lg font-bold">Description</h2>
                      <p className="text-sm text-gray-600">
                        {productData.data.product.description}
                      </p>
                    </div>

                    <div
                      className="font-roboto-light flex flex-col justify-between gap-2 rounded-md bg-white p-4 shadow-sm
                     md:flex-col md:flex-col md:gap-6 lg:flex-row"
                    >
                      <div className="mt-2 flex items-center font-bold md:mt-0">
                        <p>
                          <BsEye />
                        </p>
                        <span className="p-2">
                          {FormatNumber(productData.data.product.viewCount)}
                        </span>
                        {''} Views
                        <button
                          onClick={(e) => addFavorite(e)}
                          className="font-roboto-light ml-5 flex items-center gap-2 py-2 text-xl"
                        >
                          <BsHeart size={16} />
                        </button>
                      </div>

                      {/*      <div className="mt-2 flex items-center font-bold md:mt-0">
                        <button
                          className="font-roboto-medium mt-2 flex items-center gap-1
                       rounded-full px-6 py-1 text-sm text-white ring-1 ring-blue-700 md:mt-0"
                        >
                          <p className="text-gray-500">In Stock</p>
                          <p className="text-blue-800">60</p>
                        </button>
                      </div> */}
                      <div className="mt-3 flex items-center gap-6 sm:mt-0">
                        <h1 className="text-blue font-bold"> Share On</h1>
                        <FacebookShareButton
                          url={`http://liyumarket.com/products/${id}`}
                          quote={''}
                          hashtag={productData.data.product.name}
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <Notification notify={notify} setNotify={setNotify} />
                        <button className="font-roboto-light flex items-center gap-2 py-2 text-3xl text-gray-400">
                          <LinkedinShareButton
                            url={`http://liyumarket.com/products/${id}`}
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                        </button>
                        <button className="font-roboto-light flex items-center gap-2 py-2 text-3xl text-gray-400">
                          <TwitterShareButton
                            url={`http://liyumarket.com/products/${id}`}
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                        </button>
                      </div>
                    </div>

                    <div className="  font-roboto-light rounded-md bg-white p-4 shadow-sm">
                      <h2 className="mb-4 text-lg font-bold">
                        Seller Address{' '}
                      </h2>
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          {`${baseURL}/${productData?.data?.product?.seller?.imageURL}` ? (
                            <img
                              src={`${baseURL}/${productData?.data?.product?.seller?.imageURL}`}
                              className="h-16 w-16 rounded-full object-cover"
                            />
                          ) : (
                            <Avatar />
                          )}

                          <span
                            className={`absolute bottom-0 left-7  h-3.5 w-3.5 rounded-full border-2 
                          border-white ${
                            productData?.data?.product?.seller?.status ===
                            'ACTIVE'
                              ? 'bg-blue-700'
                              : 'bg-gray-400'
                          } dark:border-gray-800`}
                          ></span>
                        </div>

                        <div>
                          <h2 className="font-roboto-medium text-lg">
                            {`${productData?.data?.product?.seller?.first_name} ${productData?.data?.product?.seller?.last_name}`}
                          </h2>
                          <p className="flex text-sm text-gray-400">
                            <MdLocationOn className="mt-1" />{' '}
                            {`${productData?.data?.product?.location}, ${productData?.data?.product?.region},Ethiopia`}
                          </p>
                          <h6 className="text-blue flex text-center">
                            <IoCheckmarkCircleOutline className="mt-1 text-blue-800" />
                            joined {''}{' '}
                            {timeSince(
                              productData?.data?.product?.seller?.createdAt
                            )}{' '}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="font-roboto-light flex flex-col gap-2 rounded-md bg-white p-2 shadow-sm 
                    md:flex-col md:gap-6 lg:flex-row"
                    >
                      {/*  */}

                      <div className="flex flex-grow flex-col sm:flex-row  md:flex-row md:flex-col md:gap-6">
                        <Link href="/chat">
                          <button className="mt-3 rounded-full bg-blue-800 py-2 text-white sm:flex-grow md:mt-0">
                            Make an Offer
                          </button>
                        </Link>
                        <button
                          onClick={() => setShowContact(true)}
                          className="font-roboto-medium mt-3 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-blue-800 ring-2 ring-blue-800 sm:gap-1 md:mt-0"
                        >
                          <IoIosCall />
                          <p>
                            {showContact ? (
                              <p className="font-roboto-medium text-blue-800">
                                {productData?.data?.product?.seller?.phone}
                              </p>
                            ) : (
                              <p>Show Contact</p>
                            )}
                          </p>
                        </button>
                        <button
                          onClick={() => router.push('/chat')}
                          className="font-roboto-medium mt-3 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-blue-800 ring-2 ring-blue-800 md:mt-0"
                        >
                          <BsFillChatLeftTextFill />
                          <p>Chat</p>
                        </button>
                      </div>

                      {/*  */}
                    </div>
                    <div className="font-roboto-light rounded-md bg-white shadow-sm">
                      {productData?.data?.product?.options?.map(
                        (option: {
                          id: React.Key | null | undefined;
                          title:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined;
                        }) => (
                          <Disclosure key={option.id}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="text-blac font-roboto-bold flex  w-full justify-between border-b-2 border-gray-100 p-4 text-left  text-lg">
                                  <span>{option.title}</span>
                                  <BsChevronUp
                                    className={`${
                                      open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 `}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pb-2 pt-4  text-gray-500">
                                  If you're unhappy with your purchase for any
                                  reason, email us within 90 days and we'll
                                  refund you in full, no questions asked.
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )}
                      <div className="mt-0 rounded-md bg-white font-bold shadow-sm">
                        <h5 className="ml-2 p-2">Safety Tips</h5>
                        <ul className=" ml-6  list-disc bg-white p-4 font-light">
                          <li>Don't pay in advance, including for delivery</li>
                          <li>Meet the seller at a safe public place</li>
                          <li>
                            Inspect the item and ensure it's exactly what you
                            want
                          </li>
                          <li>
                            On delivery, check that the item delivered is what
                            was inspected
                          </li>
                          <li>Only pay when you're satisfied</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* div2 end here */}
              <div className="w-100 flex flex-col">
                <div className=" overflow-hidden ">
                  <div className="w-full overflow-x-hidden">
                    <CarouselBox title="Related Products" full={true}>
                      {filteredRelatedProducts?.map((productItem: any) => {
                        return (
                          <>
                            <CarouselBoxCard
                              key={productItem.id}
                              product={productItem}
                            />
                          </>
                        );
                      })}
                    </CarouselBox>{' '}
                  </div>
                </div>
              </div>{' '}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
