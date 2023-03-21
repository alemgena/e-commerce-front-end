import React from 'react';
import { FaThList } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { RxCaretRight } from 'react-icons/rx';
import { TbArrowsSort } from 'react-icons/tb';
import { TfiLayoutGrid3Alt } from 'react-icons/tfi';
import type { NextPage } from 'next';
import Breadcrumb from '@/components/BreadCrumb';
export interface AdsProp {
  location: ReactNode;
  description: ReactNode;
  url: string | undefined;
  name: ReactNode;
  price: string;
}
import {RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { baseURL } from '@/config';
export interface IProduct {
  image: any;
  name: string;
  url: string;
  description: string;
  location: string;
  tags: string[];
}

type carProp = {
  name: string;
  url: string;
};

type yearOfManufactureProp = {
  name: string;
  ads: string;
};

const CategoryPage: NextPage = () => {
  const ads = [
    {
      price: '2,100,000',
      name: 'Toyota Corolla LE 2006 Blue',
      url: 'https://pictures-ethiopia.jijistatic.com/1474958_MzAwLTIyNS1hN2Q3YjBkZTdj.webp',
      description: 'Very neat car with plate code 3 telalafi new',
      location: 'Addis Ababa, Ethiopia',
      tags: ['Ethiopian User', 'Automatic'],
    },
    {
      price: '1,250,000',
      name: 'Toyota Yaris 1.0 Eco 2006 Silver',
      url: 'https://pictures-ethiopia.jijistatic.com/1431550_MzAwLTIyNS1iNjcwMmE5YTk2.webp',
      description: 'Very neat car with plate code 3 telalafi new',
      location: 'Addis Ababa, Ethiopia',
      tags: ['Ethiopian User', 'Automatic'],
    },
    {
      price: '6,000,000',
      name: 'Toyota Corolla LE 2006 Blue',
      url: 'https://pictures-ethiopia.jijistatic.com/1131026_MzAwLTIzOS01ZmZkNTk0Zjc1.webp',
      description: 'Very neat car with plate code 3 telalafi new',
      location: 'Addis Ababa, Ethiopia',
      tags: ['Ethiopian User', 'Automatic'],
    },
    {
      price: '1,675,499',
      name: 'Toyota Corolla LE 2006 Blue',
      url: 'https://pictures-ethiopia.jijistatic.com/1581039_OTg1LTc3My04ODk4ZjYyN2Vm.webp',
      description: 'Very neat car with plate code 3 telalafi new',
      location: 'Addis Ababa, Ethiopia',
      tags: ['Ethiopian User', 'Automatic'],
    },
    {
      price: '16,499',
      name: 'Toyota Corolla LE 2006 Blue',
      url: 'https://pictures-ethiopia.jijistatic.com/1396729_MTYwMC0xMjAxLTI5ODVlODg4ZWU.webp',
      description: 'Very neat car with plate code 3 telalafi new',
      location: 'Addis Ababa, Ethiopia',
      tags: ['Ethiopian User', 'Automatic'],
    },
  ];

  const makes = [
    {
      name: 'Show all',
      numberOfAds: null,
    },
    {
      name: 'Toyota',
      numberOfAds: '1,168',
    },
    {
      name: 'Hyundai',
      numberOfAds: '316',
    },
    {
      name: 'Suzuki',
      numberOfAds: '186',
    },
    {
      name: 'Nissan',
      numberOfAds: '76',
    },
    {
      name: 'Volkswagen',
      numberOfAds: '64',
    },
  ];

  const typesOfCar = [
    {
      name: 'Toyota',
      url: 'https://assets.jiji.com.et/art/attributes/top-selection/cars2x-tinifield/toyota2x.png',
    },
    {
      name: 'Hyundai',
      url: 'https://assets.jiji.com.et/art/attributes/top-selection/cars2x-tinifield/hyundai.png',
    },
    {
      name: 'Nissan',
      url: 'https://assets.jiji.com.et/art/attributes/top-selection/cars2x-tinifield/nissan2x.png',
    },
    {
      name: 'Volkswagen',
      url: 'https://assets.jiji.com.et/art/attributes/top-selection/buses-and-microbuses/volkswagen.png',
    },
    {
      name: 'Mitsubishi',
      url: 'https://assets.jiji.com.et/art/attributes/top-selection/cars2x-tinifield/mitsubishi.png',
    },
    {
      name: 'Ford',
      url: 'https://assets.jiji.com.et/art/attributes/top-selection/cars2x-tinifield/ford2x.png',
    },
    {
      name: 'Peugeot',
      url: 'https://assets.jiji.com.et/art/attributes/top-selection/cars2x-tinifield/peugeot.png',
    },
  ];

  const yearsOfManufacture = [
    {
      name: '2019 - 2023',
      ads: '785',
    },
    {
      name: '2014 - 2018',
      ads: '284',
    },
    {
      name: '2009 - 2013',
      ads: '261',
    },
    {
      name: '2004 - 2008',
      ads: '435',
    },
    {
      name: '1999 - 2003',
      ads: '258',
    },
    {
      name: '1994 - 1998',
      ads: '77',
    },
  ];

  return (
    <>
      <div className="px-12">
        <Breadcrumb />
      </div>
      <div className="px-14 font-roboto-regular">
        <div className="flex h-full w-full flex-row gap-x-4">
          <div className="flex w-1/4 flex-col items-start justify-start">
            {/* Categories Box */}
            <div className="mb-4 h-44 w-full bg-white">
              <div className="mb-2 flex h-14 items-center justify-start rounded-t-md border-b-2 bg-primary pl-4 text-white">
                <span className="text-lg font-bold">Categories</span>
              </div>
              <div className="flex flex-col pl-4">
                <span className="text-main-secondary">Vehicles</span>
                <div className="flex flex-col pl-4">
                  <div>
                    Cars <span className="text-gray-400">| 2223</span>
                  </div>
                  <div>
                    Buses & Microbuses{' '}
                    <span className="text-gray-400">| 62</span>
                  </div>
                  <div>
                    Heavy Equipment <span className="text-gray-400">| 24</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Location */}
            <div className="mb-4 flex h-20 w-full items-center justify-between rounded-md bg-white pl-4">
              <div className="flex flex-col">
                <span className="text-lg">Location</span>
                <span className="text-gray-400">All Ethiopia</span>
              </div>
              <div className="pr-4">
                <RxCaretRight size={24} />
              </div>
            </div>
            {/* Make */}
            <div className="mb-4 flex h-fit w-full flex-col items-start justify-center rounded-md bg-white pl-4 pr-6 pb-4">
              <span className="mt-4 font-roboto-bold text-gray-500">Make</span>
              <div className="my-3 mr-8 w-full">
                <input
                  type="text"
                  placeholder="Find make"
                  className="h-12 w-full border px-8"
                />
              </div>
              <div className="flex flex-col gap-y-2 font-roboto-bold">
                {makes.map((make, idx) => (
                  <div className="flex items-center justify-start gap-x-2">
                    <input type="radio" name="make" />
                    <div className={`${idx === 0 ? 'text-primary' : ''}`}>
                      <span className="mr-2">{make.name}</span>
                      <span className="font-roboto-regular text-gray-400">
                        {`${make.numberOfAds} ads`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Year of Manifacture */}
            <div className="mb-4 flex h-fit w-full flex-col items-start justify-center rounded-md bg-white pl-4 pr-6 pb-4">
              <span className="mt-4 font-roboto-bold text-gray-500">
                Year of Manufacture
              </span>
              <div className="flex w-full gap-x-2">
                <div className="my-3 w-full">
                  <input
                    type="text"
                    placeholder="min"
                    className="h-14 w-full rounded-lg border px-8"
                  />
                </div>
                <div className="my-3 w-full">
                  <input
                    type="text"
                    placeholder="max"
                    className="h-14 w-full rounded-lg border px-8"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 font-roboto-regular">
                {yearsOfManufacture.map(
                  (yearOfManufacture: yearOfManufactureProp) => (
                    <div className="flex items-center justify-start gap-x-2">
                      <input type="radio" name="make" />
                      <div>
                        <span className="mr-2">{yearOfManufacture.name}</span>
                        <span className="font-roboto-regular text-gray-400">
                          {`${yearOfManufacture.ads} ads`}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex w-4/5 flex-col items-start">
            <span className="font-roboto-bold text-3xl text-gray-500">
              Cars in Ethiopia
            </span>
            <div className="mt-2 flex h-52 w-full flex-col rounded-md bg-white pt-4">
              <div className="flex flex-row justify-around gap-x-4 px-8">
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4">
                  {'< ETB 500K'}
                </div>
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4">
                  {'< ETB 500K'}
                </div>
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4">
                  {'< ETB 500K'}
                </div>
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4">
                  {'< ETB 500K'}
                </div>
              </div>
              <div className="mt-2 flex flex-row justify-around px-8">
                {typesOfCar.map((typeOfCar: carProp) => (
                  <div className="flex w-full flex-col items-center justify-center px-4 py-2 hover:rounded-lg hover:bg-blue-300">
                    <img src={typeOfCar.url} alt="" className="h-16 w-16" />
                    <span>{typeOfCar.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
              <div className="flex gap-x-3">
                <TfiLayoutGrid3Alt size={18} className="text-primary" />
                <FaThList size={18} className="text-gray-400" />
              </div>
              <div className="flex items-center gap-x-2 text-gray-600">
                <span>Sort by:</span>
                <div className="flex items-center gap-x-1">
                  <TbArrowsSort size={18} className="text-primary" />
                  <span>Recommended</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex w-full flex-col">
              <div className="grid grid-cols-4 gap-x-4">
                {ads.map((ad: AdsProp) => (
                  <div className="min-h-96 mb-4 flex w-full cursor-pointer flex-col justify-between rounded-lg bg-white font-roboto-regular shadow">
                    <div className="relative flex h-[55%]">
                      <img
                        src={ad.url}
                        className="w-full rounded-t-lg object-contain object-top"
                        alt="phone"
                      />
                    </div>
                    <div className="flex flex-col px-4 pt-2 pb-6">
                      <span className="font-roboto-bold text-xl text-primary">
                        ETB {ad.price}
                      </span>
                      <span className="text-ellipsis text-lg">{ad.name}</span>
                      <span className="text-sm text-gray-400">
                        {ad.description}
                      </span>
                      <div className="mt-1 flex gap-x-1">
                        <IoLocationSharp className="text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {ad.location}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-x-2 text-sm">
                        {ad.tags.map((tag) => (
                          <div className="rounded-md bg-gray-200 px-2 py-1">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
