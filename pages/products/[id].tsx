import { useState, useEffect } from 'react';
import {
  BsChevronUp,
  BsEye,
  BsFillChatLeftTextFill,
  BsHeart,
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
const Map = dynamic(() => import('@/components/map').then((mod) => mod.Map), {
  ssr: false,
});

const options = [
  {
    id: 'o-1',
    title: 'Spec',
  },
  {
    id: 'o-2',
    title: 'Materials',
  },
  {
    id: 'o-3',
    title: 'Dimention',
  },
  {
    id: '-4',
    title: 'Shipping',
  },
];

const colors = ['#F62424', '#3399FF', '#33FFAF', '#B533FF'];
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
  console.log('products', products);

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
          <div
            onClick={() => router.push('/')}
            className="flex flex items-center gap-2 py-4 text-xl  hover:cursor-pointer"
          >
            <h1 className="flex text-center">
              <FiArrowLeft className="ml-3" />
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
                <div className="md:w-3/2 w-full">
                  <div className="md:w-3/2 flex w-full flex-col gap-6 ">
                    <div className="rounded-md bg-white px-4 py-6 shadow-sm">
                      <h2 className="font-roboto-medium text-xl">
                        Tesla Model X
                      </h2>
                      <p className="mb-4 text-sm text-blue-800">
                        BelayAb Motors
                      </p>
                      <h2 className="font-roboto-light text-xl">
                        {productData.data.product.price}
                      </h2>
                    </div>
                    <div className="font-roboto-light flex flex-col gap-2 rounded-md bg-white p-4 shadow-sm md:flex-col md:gap-6 lg:flex-row">
                      {/*  */}
                      <div className="flex flex-grow  flex-col sm:flex-row sm:flex-col md:flex-row md:gap-6">
                        <Link href="/chat">
                          <button className="mt-3 flex-grow rounded-full bg-blue-800 py-2 text-white md:mt-0">
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
                                {productData.data.product.seller.phone}
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

                      <div className="mt-3 flex items-center gap-6 sm:mt-0">
                        <button
                          onClick={(e) => addFavorite(e)}
                          className="font-roboto-light flex items-center gap-2 py-2 text-3xl"
                        >
                          <BsHeart />
                        </button>
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
                      {/*  */}
                    </div>

                    <div
                      className="font-roboto-light flex flex-col justify-between gap-2 rounded-md bg-white p-4 shadow-sm
                     md:flex-col md:flex-col md:gap-6 lg:flex-row"
                    >
                      <div className="flex items-center gap-2 md:gap-14">
                        <h6 className="font-roboto-medium">Color</h6>
                        <div className="flex flex-wrap gap-2 sm:flex-row">
                          {colors.map((color, index) => (
                            <div
                              key={index.toString()}
                              className="h-8 w-8 rounded-sm ring-1 ring-gray-100 sm:flex-row"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center font-bold md:mt-0">
                        <p>{productData.data.product.viewCount}</p>
                        <span className="p-2">
                          <BsEye />
                        </span>
                      </div>

                      <div className="mt-2 flex items-center font-bold md:mt-0">
                        <span className="p-2">ETB </span>
                        <p>{productData.data.product.price}</p>
                      </div>
                      <div className="mt-2 flex items-center font-bold md:mt-0">
                        <button
                          className="font-roboto-medium mt-2 flex items-center gap-1
                       rounded-full px-6 py-1 text-sm text-white ring-1 ring-blue-700 md:mt-0"
                        >
                          <p className="text-gray-500">In Stock</p>
                          <p className="text-blue-800">60 Piece</p>
                        </button>
                      </div>
                    </div>

                    <div className="rounded-md bg-white px-4 py-6 shadow-sm">
                      <h2 className="font-roboto-medium mb-4 text-lg">
                        Description
                      </h2>
                      <p className="text-sm text-gray-600">
                        {productData.data.product.description}
                      </p>
                    </div>
                    <div className="  font-roboto-light rounded-md bg-white p-4 shadow-sm">
                      <h2 className="font-roboto-bold mb-4 text-lg">
                        Store Detail
                      </h2>
                      <div className="flex items-center gap-6">
                        <img
                          src={`${baseURL}/${productData.data.product.imagesURL[0]}`}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="font-roboto-medium text-lg">
                            Ambassador Clothing
                          </h2>
                          <p className="text-sm text-gray-400">
                            Mexico, Abebe Bldg - 4th Flr, Addis Ababa, Ethiopia
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="font-roboto-light rounded-md bg-white shadow-sm">
                      {options.map((option) => (
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
                                reason, email us within 90 days and we'll refund
                                you in full, no questions asked.
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* div2 end here */}
              <div className="w-100 flex flex-col">
                <div className=" overflow-hidden ">
                  <div className="w-full overflow-x-hidden">
                    <CarouselBox title="Related Products" full={true}>
                      {productData?.data?.relatedProducts?.map(
                        (productItem: any) => {
                          return (
                            <>
                              <CarouselBoxCard
                                key={productItem.id}
                                product={productItem}
                              />
                            </>
                          );
                        }
                      )}
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
