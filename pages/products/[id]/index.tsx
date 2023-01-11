import { useState } from 'react';
import { BiShare } from 'react-icons/bi';
import { BsChevronUp, BsFillChatLeftTextFill, BsHeart } from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { IoIosCall, IoIosCloseCircle } from 'react-icons/io';
import { MdOutlineReport } from 'react-icons/md';
import { Disclosure } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

const Map = dynamic(() => import('@/components/map').then((mod) => mod.Map), {
  ssr: false,
});

const images = [
  {
    id: 'p-1',
    url: '/images/product/product.png',
  },
  {
    id: 'p-2',
    url: '/images/product/product.png',
  },
  {
    id: 'p-3',
    url: '/images/product/product.png',
  },
  {
    id: 'p-4',
    url: '/images/product/product.png',
  },
];

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

const colors = ['#ffffff', '#F62424', '#043CBE', '#5E5E5E', '#000000'];

function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [showContact, setShowContact] = useState(false);
  return (
    <>
      <Head>
        <title>Product Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="flex items-center gap-2 py-4  text-xl">
          <FiArrowLeft />
          <h2>Product Detail</h2>
        </div>
        <div className="grid grid-cols-2 gap-12 pb-20">
          <div>
            <img
              src={activeImage.url}
              width="960px"
              height="600px"
              className="overflow-hidden rounded-sm object-cover"
            />
            <div className="mt-6  grid grid-cols-4 gap-6">
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  width="full"
                  height="130px"
                  className={`cursor-pointer overflow-hidden rounded-sm object-cover ${
                    activeImage.id === image.id && 'ring-2 ring-blue-800'
                  } `}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
            <div className="mt-10 overflow-hidden rounded-sm">
              <Map center={[9.005401, 38.763611]} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-md bg-white px-4 py-6 shadow-sm">
              <h2 className="font-roboto-medium text-xl">Tesla Model X</h2>
              <p className="mb-4 text-sm text-blue-800">BelayAb Motors</p>
              <h2 className="font-roboto-light text-xl">21,999,000.00 ETB</h2>
            </div>
            {showContact ? (
              <div className="flex items-center justify-between  rounded-md bg-white p-4 font-roboto-light shadow-sm">
                <div className="flex items-center gap-6">
                  <img
                    src="/images/product/product.png"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-roboto-medium text-sm">Abebe Kebede</h2>
                    <p className="font-roboto-medium   text-blue-800">
                      09 11 12 13 14
                    </p>
                  </div>
                </div>
                <IoIosCloseCircle
                  className="cursor-pointer text-2xl text-gray-400"
                  onClick={() => setShowContact(false)}
                />
              </div>
            ) : (
              <div className="flex gap-6 rounded-md bg-white p-4 font-roboto-light shadow-sm">
                <Link href="/chat">
                  <button className="flex-grow rounded-full bg-blue-800 py-2 text-white">
                    Make an Offer
                  </button>
                </Link>
                <button
                  onClick={() => setShowContact(true)}
                  className="flex items-center gap-2 rounded-full bg-white py-2 px-4 font-roboto-medium text-blue-800 ring-2 ring-blue-800"
                >
                  <IoIosCall />
                  <p>Call</p>
                </button>
                <button className="flex items-center gap-2 rounded-full bg-white py-2 px-4 font-roboto-medium text-blue-800 ring-2 ring-blue-800">
                  <BsFillChatLeftTextFill />
                  <p>Chat</p>
                </button>
                <button className="flex items-center gap-2 py-2  font-roboto-light text-3xl text-gray-400">
                  <BsHeart />
                </button>
                <button className="flex items-center gap-2 py-2  font-roboto-light text-3xl text-gray-400">
                  <BiShare />
                </button>
                <button className="flex items-center gap-2 py-2  font-roboto-light text-3xl text-gray-400">
                  <MdOutlineReport />
                </button>
              </div>
            )}

            <div className="flex justify-between gap-6 rounded-md bg-white p-4 font-roboto-light shadow-sm">
              <div className="flex items-center gap-14">
                <h6 className="font-roboto-medium">Color</h6>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <div
                      key={index.toString()}
                      className="h-8 w-8 rounded-sm ring-1 ring-gray-100"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-1 rounded-full py-1 px-6 font-roboto-medium text-sm text-white ring-1 ring-blue-700">
                <p className="text-gray-500">In Stock</p>
                <p className="text-blue-800">60 Piece</p>
              </button>
            </div>
            <div className="rounded-md bg-white px-4 py-6 shadow-sm">
              <h2 className="mb-4 font-roboto-medium text-lg">Description</h2>
              <p className="text-sm text-gray-600">
                Quick, high-tech, and featuring a flashy gimmick in its
                Falcon-wing rear doors, it presents a unique-but-expensive
                proposition in the growing EV-crossover segment. The Model X
                comes standard with two electric motors making a total of 670
                horsepower and all-wheel drive; a three-motor version called
                Plaid makes an astounding 1020 horsepower and is said to shoot
                to 60 mph in just 2.5 seconds. That mega-motor version will be
                available in late 2022 according to Tesla.
              </p>
            </div>
            <div className="  rounded-md bg-white p-4 font-roboto-light shadow-sm">
              <h2 className="mb-4 font-roboto-bold text-lg">Store Detail</h2>
              <div className="flex items-center gap-6">
                <img
                  src="/images/product/product.png"
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
            <div className="rounded-md bg-white font-roboto-light shadow-sm">
              {options.map((option) => (
                <Disclosure key={option.id}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="text-blac flex w-full  justify-between border-b-2 border-gray-100 p-4 text-left font-roboto-bold  text-lg">
                        <span>{option.title}</span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 `}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2  text-gray-500">
                        If you're unhappy with your purchase for any reason,
                        email us within 90 days and we'll refund you in full, no
                        questions asked.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="font-roboto-bold text-xl">RELATED PRODUCTS</h2>
          <div className="flex w-full gap-4 overflow-x-auto scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data) => (
              <div key={data.toString()} className="w-52 flex-shrink-0">
                <img
                  src="/images/product/related-product.png"
                  className="h-52 w-full object-cover"
                />
                <div className="bg-white">
                  <div className="flex flex-col gap-3 p-2">
                    <h6 className="text-sm text-gray-500">Samsung A51</h6>
                    <div className="flex items-center justify-between">
                      <h6 className="font-roboto-bold ">19,450 ETB</h6>
                      <h6 className="rounded-full bg-gray-100 px-3 py-1">
                        Used
                      </h6>
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-gray-200" />
                  <div className="flex  gap-6  rounded-md p-2 font-roboto-light">
                    <button className=" rounded-full bg-blue-800 px-3 py-2 text-sm text-white">
                      Make Offer
                    </button>

                    <button className="flex flex-grow items-center justify-center  font-roboto-light text-xl text-gray-400">
                      <BsHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
