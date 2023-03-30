import React from 'react';
import { FaThList } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { RxCaretRight } from 'react-icons/rx';
import { TbArrowsSort } from 'react-icons/tb';
import { TfiLayoutGrid3Alt } from 'react-icons/tfi';
import type { NextPage } from 'next';
import Breadcrumb from '@/components/BreadCrumb';
import { useRouter } from 'next/router';
import Norecords from '@/components/Ui/Norecords';
import Link from 'next/link';
import { GET_SUB_CATEGORIE } from '@/types';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { baseURL } from '@/config';
import { useMediaQuery } from 'react-responsive';
import NextLink from 'next/link';
export interface IProduct {
  image: any;
  name: string;
  url: string;
  id: string;
  description: string;
  location: string;
  tags: string[];
  imagesURL: string[];
  price: string;
}

type carProp = {
  name: string;
  url: string;
};
const CategoryPage: NextPage = () => {
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
  const apiKey = 'AIzaSyDdfMxmTxz8u1XdD99_JCEX_9S41PbcJPE';
  const locationName = 'Debre Elias, Ethiopia';
  const hhh = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${apiKey}`
    );
    const data = await response.json();
  };
  const sm = useMediaQuery({ query: '(max-width: 576px)' });
  const md2 = useMediaQuery({ query: '(min-width: 577px)' });
  const md3 = useMediaQuery({ query: '(max-width: 930px)' });
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
  const subCategorie = useSelector(
    (state: RootStateOrAny) => state.subCategories.subCategories
  );
  let found: any;
  const [mainCategory, setMainCategory] = React.useState<any>();
  React.useEffect(() => {
    if (categories.data) {
      categories.data.map((items: any) => {
        if (items.subcategory.length) {
          found = items.subcategory.find(function (element: any) {
            return element.name == query.name;
          });
        }
        if (found) {
          setMainCategory(
            categories.data.find(function (element: any) {
              return element.id == found.category;
            })
          );
          dispatch({ type: GET_SUB_CATEGORIE, id: found.id });
        }
      });
    }
  }, [query.name, categories.data]);
  return (
    <>
      <div className="px-12">
        <Breadcrumb />
      </div>
      <div className="px-14 font-roboto-regular" >
        <div className="flex h-full w-full flex-row gap-x-4" >
          <div className="flex w-1/4 flex-col items-start justify-start" >
            {/* Categories Box */}
            {!sm && (
              <div className="mb-4 h-44 w-full bg-white">
                <div className="mb-2 flex h-14 items-center justify-start rounded-t-md border-b-2 bg-primary pl-4 text-white">
                  <span className="text-lg font-bold">Categories</span>
                </div>
                {mainCategory && (
                  <div className="flex h-fit flex-col pl-4">
                    <span className="text-main-secondary">
                      {mainCategory ? mainCategory.name : null}
                    </span>
                    <div className="flex h-fit flex-col pl-4">
                      {mainCategory.subcategory.map((item: any) => (
                        <div>
                          {item.name !== query.name && (
                            <Link
                              href={{
                                pathname: '/category',
                                query: { name: item.name },
                              }}
                            >
                              <div className="mt-2 cursor-pointer">
                                {item.name}
                                <span className="text-gray-400">| 2223</span>
                              </div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Location */}

            {/* Make */}

            {/* Year of Manifacture */}
          </div>
          <div
            className={
              sm
                ? 'mr-10 flex w-4/5 flex-col items-start'
                : 'flex w-4/5 flex-col items-start'
            }
          >
            <span className="font-roboto-bold text-3xl text-gray-500">
              {query.name} in Ethiopia
            </span>
            <div className="mt-2 flex h-52 w-full flex-col rounded-md bg-white pt-4" >
              <div className="flex flex-row justify-around gap-x-4 px-8" >
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4" >
                  {'< ETB 500K'}
                </div>
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4" >
                  {'< ETB 500K'}
                </div>
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4" >
                  {'< ETB 500K'}
                </div>
                <div className="flex w-full justify-center rounded-xl bg-gray-200 px-14 py-4" >
                  {'< ETB 500K'}
                </div>
              </div>
              <div className="mt-2 flex flex-row justify-around px-8">
                {typesOfCar.map((typeOfCar: carProp) => (
                  <div className="flex w-full flex-col items-center justify-center px-4 py-2 hover:rounded-lg hover:bg-blue-300" >
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
              {subCategorie.data && (
                <>
                  {subCategorie.data.product.length ? (
                    <>
                      {sm ? (
                        <div className="grid grid-cols-2  gap-x-4">
                          {subCategorie.data.product.map((ad: IProduct) => (
                            <div className="min-h-96 mb-4 flex w-full cursor-pointer flex-col justify-between rounded-lg bg-white font-roboto-regular shadow">
                              <div className="relative flex h-[55%]">
                                <img
                                  src={`${baseURL}/${ad.imagesURL[0]}`}
                                  className="w-full rounded-t-lg object-contain object-top"
                                  alt={ad.name}
                                />
                              </div>
                              <div className="flex flex-col px-4 pt-2 pb-6">
                                <span className="font-roboto-bold text-xl text-primary">
                                  ETB {ad.price}
                                </span>
                                <span className="text-ellipsis text-lg">
                                  {ad.name}
                                </span>
                                <span className="text-sm text-gray-400">
                                  {ad.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={
                            md2 && md3
                              ? 'grid grid-cols-3  gap-x-4'
                              : 'grid grid-cols-4  gap-x-4'
                          }
                        >
                          {subCategorie.data.product.map((ad: IProduct) => (
                            <NextLink href={`/products/${ad.id}`} passHref>
                              <div className="min-h-96 mb-4 flex w-full cursor-pointer flex-col justify-between rounded-lg bg-white font-roboto-regular shadow">
                                <div className="relative flex h-[55%]">
                                  <img
                                    src={`${baseURL}/${ad.imagesURL[0]}`}
                                    className="w-full rounded-t-lg object-contain object-top"
                                    alt={ad.name}
                                  />
                                </div>
                                <div className="flex flex-col px-4 pt-2 pb-6">
                                  <span className="font-roboto-bold text-xl text-primary">
                                    ETB {ad.price}
                                  </span>
                                  <span className="text-ellipsis text-lg">
                                    {ad.name}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    {ad.description}
                                  </span>
                                </div>
                              </div>
                            </NextLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Norecords col={5} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
