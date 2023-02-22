import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import MegaMenu from '../components/menu/MegaMenu';
import BannerImage from '../public/images/fashion-banner.webp';

type AdsProp = {
  name: string;
  url: string;
  price: string;
  qty: string;
};

const Index = () => {
  const ads = [
    {
      name: 'Samsung Galaxy S10E',
      url: 'https://pictures-ethiopia.jijistatic.com/1572054_OTYwLTEyODAtZTIyZWE3MTM5Yw.webp',
      price: '14,500',
      qty: '3',
    },
    {
      name: 'New Infinix Hot 12 128GB',
      url: 'https://pictures-ethiopia.jijistatic.com/1429852_NzIwLTEwNjAtNzczMzc5YWI4Yg.webp',
      price: '15,999',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy J4 Plus',
      url: 'https://pictures-ethiopia.jijistatic.com/1438352_MTEyNS0xNTAwLWYwZjRiNTljZTE.webp',
      price: '6,000',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy A30',
      url: 'https://pictures-ethiopia.jijistatic.com/1486219_NzIwLTk1Ni00YTIyNDNkNTBh.webp',
      price: '16,499',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy S10E',
      url: 'https://pictures-ethiopia.jijistatic.com/1572054_OTYwLTEyODAtZTIyZWE3MTM5Yw.webp',
      price: '14,500',
      qty: '3',
    },
    {
      name: 'New Infinix Hot 12 128GB',
      url: 'https://pictures-ethiopia.jijistatic.com/1429852_NzIwLTEwNjAtNzczMzc5YWI4Yg.webp',
      price: '15,999',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy J4 Plus',
      url: 'https://pictures-ethiopia.jijistatic.com/1438352_MTEyNS0xNTAwLWYwZjRiNTljZTE.webp',
      price: '6,000',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy A30',
      url: 'https://pictures-ethiopia.jijistatic.com/1486219_NzIwLTk1Ni00YTIyNDNkNTBh.webp',
      price: '16,499',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy S10E',
      url: 'https://pictures-ethiopia.jijistatic.com/1572054_OTYwLTEyODAtZTIyZWE3MTM5Yw.webp',
      price: '14,500',
      qty: '3',
    },
    {
      name: 'New Infinix Hot 12 128GB',
      url: 'https://pictures-ethiopia.jijistatic.com/1429852_NzIwLTEwNjAtNzczMzc5YWI4Yg.webp',
      price: '15,999',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy J4 Plus',
      url: 'https://pictures-ethiopia.jijistatic.com/1438352_MTEyNS0xNTAwLWYwZjRiNTljZTE.webp',
      price: '6,000',
      qty: '2',
    },
    {
      name: 'Samsung Galaxy A30',
      url: 'https://pictures-ethiopia.jijistatic.com/1486219_NzIwLTk1Ni00YTIyNDNkNTBh.webp',
      price: '16,499',
      qty: '2',
    },
  ];

  return (
    <div className="mt-10 gap-x-4 sm:w-full sm:flex-col md:flex  md:flex-row md:items-start md:justify-between  md:overflow-hidden">
      <div className=" mt-4 mb-10 w-1/3 sm:hidden md:ml-5 md:flex">
        <MegaMenu />
      </div>
      <div className="mr-6 flex w-11/12 flex-col">
        <div className="top-0 z-0 mt-4 flex justify-between gap-x-6">
          <div
            className="flex h-60 w-3/4 flex-col  rounded-md bg-cover bg-center p-10 shadow"
            style={{
              backgroundImage: 'url("/images/fashion-banner.webp")',
            }}
          >
            <span className="font-roboto-bold text-5xl text-primary">
              How to buy <br /> on Liyu?
            </span>
            <span className="mt-4 font-roboto-medium underline">
              Click here
            </span>
          </div>
          <div className=" h-60 w-1/4 rounded-md bg-orange-500 shadow">
            <div className="flex flex-col items-center justify-center p-6 text-center font-roboto-medium text-white">
              <span className="text-xl">Got something to sell?</span>
              <span className="py-4">
                <BsFillPlusCircleFill size={60} />
              </span>
              <span className="text-center text-lg">
                Post an advert for <br /> free!
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="mb-5">
            <span className="font-roboto-bold text-2xl text-main-secondary">
              Trending ads
            </span>
          </div>
          <div className=" mb-20 grid grid-cols-4 gap-4">
            {ads.map((ad: AdsProp, idx: number) => (
              <div
                key={idx.toString()}
                className=" flex max-h-max w-full flex-col justify-between rounded-lg bg-white font-roboto-regular shadow"
              >
                <div className="relative">
                  <div className="absolute left-0 bottom-0 flex h-7 w-8 items-center justify-center rounded-tr-lg bg-main-secondary bg-opacity-80">
                    <span className="text-sm text-white">{ad.qty}</span>
                  </div>
                  <img
                    src={ad.url}
                    className="h-48 w-full rounded-t-lg object-cover object-center"
                    alt="phone"
                  />
                  <div className="absolute right-0 -bottom-6 mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
                    <AiOutlineHeart size={24} />
                  </div>
                </div>
                <div className="flex flex-col px-4 pt-6 pb-6">
                  <span className="text-lg">{ad.name}</span>
                  <span className="text-base text-primary">ETB {ad.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
