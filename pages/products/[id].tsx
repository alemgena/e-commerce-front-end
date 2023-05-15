import { useState, useEffect } from 'react';
import {
  BsChevronUp,
  BsEye,
  BsFillChatLeftTextFill,
  BsHeart,
  BsMap,
} from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { IoIosArrowBack, IoIosCall } from 'react-icons/io';
import axios from 'axios';
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
import CarouselBox from '@/components/carousel/carousel-box';
import CarouselBoxCard from '@/components/carousel/carousel-box-card';
import NumberWithCommas from '@/lib/types/number-commas';
import timeSince from '@/lib/types/time-since';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import FormatNumber from '@/lib/types/number-format';
import { Avatar } from '@mui/material';
import { LocationCity, MapOutlined } from '@mui/icons-material';
import { MdLocationOn } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
const Map = dynamic(() => import('@/components/map').then((mod) => mod.Map), {
  ssr: false,
});
function ProductDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [selectedImg, setSelectedImg] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const productData = useSelector(
    (state: RootStateOrAny) => state.product.product
  );
  //favorite
  const [latitude, setLatitude] = useState<any>('');
  const [longitude, setLongitude] = useState<any>('');

  const favorite = useSelector((state: RootStateOrAny) => state.favorite);
  console.log(favorite);
  const { isLoading } = useSelector((state: RootStateOrAny) => state?.product);
  useEffect(() => {
    dispatch({ type: GET_PRODUCT, id: id });
    handleSearch();
  }, [id]);

  const handleSearch = async () => {
    const apiKey = 'AIzaSyDdfMxmTxz8u1XdD99_JCEX_9S41PbcJPE';
    const locationName = `${productData.data?.product?.location}, ${productData.data?.product?.region}`;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setLatitude(data.results[0].geometry.location.lat);
        setLongitude(data.results[0].geometry.location.lng);
      } else {
        console.log('Location not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  const handleChat = async () => {
    try {
      const { data } = await axios.post(
        `${baseURL}api/notifications/sendNotification`,
        {
          notification: {
            title: 'Firebase',
            body: 'Firebase is awesome',
            click_action: 'http://localhost:3000/',
            icon: 'http://url-to-an-icon/icon.png',
          },
          to: productData.data.product.seller.device_token,
        }
      );
      if (data.success) {
        let login_token = localStorage.getItem('token');
        let config = {
          headers: {
            Authorization: `Bearer ${login_token}`,
          },
        };
        try {
          const { data } = await axios.post(
            `${baseURL}api/notifications`,
            {
              title: 'Product buyer ',
              description: `Some one is contacting you on the chat${productData.data.product.name} `,
              body: 'Description',
              status: 'un read',
              type: 'chat',
              image: 'images/notification/image_1680007561342.png',
              userId: productData.data.product.seller._id,
            },
            config
          );
          if (data) {
            router.push('/chat');
          }
        } catch (error: any) {
          let message: string;
          if (error.response.data.error.message === 'Please authenticate')
            message = 'your sesstion is expired login again';
          else {
            message = error.response.data.error.message;
          }
          NotifyMessage({
            message: message,
            type: 'error',
          });
        }
      }
    } catch (error: any) {
      NotifyMessage({
        message: error.response.data.error.message,
        type: 'error',
      });
    }
  };
  const filteredRelatedProducts = productData?.data?.relatedProducts.filter(
    (relatedProduct: any) => {
      return relatedProduct.id !== productData?.data?.product.id;
    }
  );

  function onClickHandler(index: number) {
    setSelectedImg(index);
  }
  const handleClick = () => {
    setSelectedImg(
      (selectedImg + 1) % productData.data.product.imagesURL.length
    );
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleClickFullScreen = () => {
    setIsOpen(!isOpen);
  };
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
        <>
          {isOpen && (
            <div
              className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-75"
              onClick={handleClickFullScreen}
            >
              <img
                src={`${baseURL}${productData?.data?.product?.imagesURL[selectedImg]}`}
                className="max-h-full max-w-full"
              />
            </div>
          )}
          <div className=" bg-gray-350 mx-auto w-full overflow-x-hidden px-24 pb-32">
            <div className="flex flex items-center gap-2 py-4 text-xl  ">
              <h1
                onClick={() => router.push('/')}
                className=" flex text-center hover:cursor-pointer"
              >
                <IoIosArrowBack className="ml-3 mt-1" />
                Product List
              </h1>
            </div>
            {productData.data && (
              <>
                <div className="flex flex-col md:flex-row">
                  <div className="mx-auto w-full md:w-1/2">
                    <div className="w-150 max-h-30 relative mx-auto">
                      <img
                        loading="lazy"
                        alt="product img"
                        className="dark:bg-palette-card mx-h-30 left-0 top-20 w-full overflow-hidden rounded-sm object-contain
                       object-center md:drop-shadow-xl"
                        src={`${baseURL}${productData?.data?.product?.imagesURL[selectedImg]}`}
                      />

                      <button
                        onClick={handleClick}
                        className="absolute bottom-2 left-2 flex rounded-lg bg-gray-100 px-2 py-1 text-gray-800 shadow-md"
                      >
                        <span className="flex">
                          <FaCamera size={20} className="mx-2 pt-1" />
                          {`${selectedImg + 1}/${
                            productData?.data?.product?.imagesURL.length
                          }`}
                        </span>
                      </button>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                      {productData.data.product.imagesURL.map(
                        (image: any, index: number) => (
                          <img
                            loading="lazy"
                            key={index}
                            src={`${baseURL}${productData?.data?.product?.imagesURL[index]}`}
                            className={`sm:h-22 h-20 w-full cursor-pointer overflow-hidden rounded-sm object-contain ${
                              index === selectedImg && 'ring-2 ring-blue-800 '
                            } `}
                            onClick={() => onClickHandler(index)}
                          />
                        )
                      )}
                    </div>
                    <div
                      className="aspect-w-16 aspect-h-9 md:w-3/2 relative z-0 mt-10 w-full overflow-hidden rounded-sm
                   object-contain md:mt-6"
                    >
                      <Suspense fallback={<div>Loading...</div>}>
                        {latitude && longitude && (
                          <Map
                            center={[latitude, longitude]}
                            location={productData.data?.product?.location}
                            region={productData.data.product?.region}
                          />
                        )}
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
                        <h2 className="text-xl font-bold text-blue-600">
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
                            className="font-roboto-light ml-5 flex  items-center gap-2 py-2 text-xl hover:text-red-600"
                          >
                            <BsHeart size={16} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-6 sm:mt-0">
                          <h1 className="text-blue font-bold hover:text-blue-700">
                            {' '}
                            Share On
                          </h1>
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
                                  {productData?.data?.product?.seller?.phone ??
                                    productData?.data?.product?.seller?.email}
                                </p>
                              ) : (
                                <p>Show Contact</p>
                              )}
                            </p>
                          </button>
                          <button
                            onClick={() => handleChat()}
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
                            <li>
                              Don't pay in advance, including for delivery
                            </li>
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
                {filteredRelatedProducts?.length > 0 ? (
                  <div className="w-100 flex flex-col">
                    <div className=" overflow-hidden ">
                      <div className="w-full overflow-x-hidden">
                        <CarouselBox title="Related Products" full={true}>
                          {filteredRelatedProducts?.map((productItem: any) => {
                            console.log(filteredRelatedProducts.length);
                            return (
                              <>
                                <CarouselBoxCard
                                  key={productItem.id}
                                  product={productItem}
                                  length={filteredRelatedProducts?.length}
                                />
                              </>
                            );
                          })}
                        </CarouselBox>{' '}
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetailPage;
