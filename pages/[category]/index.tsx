import React, { useState } from 'react';
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
import axios from 'axios';
import PageSpinner from '@/components/Ui/PageSpinner';
import Notification from '@/components/Ui/Notification';
import Notify from '@/components/Ui/Notify';
import NumberWithCommas from '@/lib/types/number-commas';
import ServiceCard from '@/components/Card/product-card';
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Popover,
  Select,
} from '@mui/material';
import { Filter } from '@mui/icons-material';
import { iteratorSymbol } from 'immer/dist/internal';
import ProductFilter from './filter';
export interface IProduct {
  image: any;
  name: string;
  url: string;
  id: string;
  description: string;
  location: string;
  tags: string[];
  imagesURL: string[];
  price: any;
  viewCount?: number;
}

type carProp = {
  name: string;
  url: string;
};
const CategoryPage: NextPage = () => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const [list, setList] = useState('Grid');
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
  let found: any;
  const [subCategoryId, setSubCategory] = React.useState<string>();
  const [mainCategory, setMainCategory] = React.useState<any>();
  const [products, setProducts] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (categories.data) {
      setLoading(true);
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
          //   dispatch({ type: GET_SUB_CATEGORIE, id: found.id });
          setSubCategory(found.id);
          async function fetchData() {
            try {
              const { data } = await axios.get(
                `${baseURL}api/subcategories/${found.id}`
              );
              if (data) {
                setLoading(false);
                setProducts(data.data.product);
              }
            } catch (error: any) {
              setLoading(false);
              NotifyMessage({
                message: error.message,
                type: 'error',
              });
            }
          }
          fetchData();
        }
      });
    }
  }, [query.name, categories.data]);
  const searchByPrice = async (from: number, to: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseURL}api/products?filters=[{"price":{"from":${from},"to":${to}}},{"subcategory":${JSON.stringify(
          subCategoryId
        )}}]`
      );
      if (data) {
        setLoading(false);
        setProducts(data.data);
      }
    } catch (error: any) {
      setLoading(false);
      NotifyMessage({
        message: error.message,
        type: 'error',
      });
    }
  };

  const handleMouseEnter = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelectChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="px-12">
        <Breadcrumb mainCategory={mainCategory ? mainCategory.name : null} />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <div className="font-roboto-regular px-14">
        {loading ? (
          <PageSpinner />
        ) : (
          <div className="flex h-full w-full flex-row gap-x-4">
            <div className="flex w-1/4 flex-col items-start justify-start">
              {/* Categories Box */}
              {!sm && mainCategory && (
                <div className="mb-4 w-full bg-white">
                  <div className="bg-primary mb-2 flex h-14 items-center justify-start rounded-t-md border-b-2 pl-2 ">
                    <span className="text-lg font-bold">
                      {mainCategory ? mainCategory.name : null}
                    </span>
                  </div>
                  <div className="mx-auto flex h-fit flex-col">
                    <span className="text-main-secondary"></span>
                    <div className="flex h-fit flex-col pl-4">
                      {mainCategory.subcategory.map((item: any) => (
                        <div>
                          <Link
                            href={{
                              pathname: '/category',
                              query: { name: item.name },
                            }}
                          >
                            <div
                              className={`mt-2 p-2 ${
                                item?.name === query?.name ? `bg-blue-100` : ''
                              } cursor-pointer`}
                            >
                              {item.name}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
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
              <span className="text-3xl font-bold ">
                {query.name} in Ethiopia
              </span>

              <div className="mt-4 flex w-full items-center justify-between">
                <div className="flex gap-x-3">
                  <TfiLayoutGrid3Alt
                    size={18}
                    onClick={() => setList('Grid')}
                    className={` text-gray-400 ${
                      list === 'Grid' ? 'text-sky-800' : ''
                    } hover:cursor-pointer`}
                  />
                  <FaThList
                    size={18}
                    onClick={() => setList('List')}
                    className={`text-gray-400 ${
                      list !== 'Grid' ? 'text-sky-800' : ''
                    } hover:cursor-pointer`}
                  />
                </div>
                <div className="flex items-center gap-x-2 text-gray-600">
                  <div className="flex items-center gap-x-1">
                    <FormControl>
                      <InputLabel id="my-select-label">
                        Select an option
                      </InputLabel>
                      <Select
                        labelId="my-select-label"
                        id="my-select"
                        value={value}
                        onChange={handleSelectChange}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        MenuProps={{
                          anchorEl,
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                        }}
                      >
                        <MenuItem
                          value={'option1'}
                          onClick={() => searchByPrice(1, 500000)}
                        >
                          {' '}
                          {'< ETB 500K'}
                        </MenuItem>
                        <MenuItem
                          value={'option2'}
                          onClick={() => searchByPrice(500001, 1500000)}
                        >
                          {' '}
                          {'ETB 500K-1.5M'}
                        </MenuItem>
                        <MenuItem
                          value={'option3'}
                          onClick={() => searchByPrice(1500000, 3000000)}
                        >
                          {' '}
                          {'ETB 1.5M-3M'}
                        </MenuItem>
                        <MenuItem
                          value={'option4'}
                          onClick={() => searchByPrice(3000000, 10000000)}
                        >
                          {' '}
                          {'> ETB 3M'}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <ProductFilter />
                <button
                  id="dropdownHoverButton"
                  data-dropdown-toggle="dropdownHover"
                  data-dropdown-trigger="hover"
                  className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium
                   text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 
                   dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Dropdown hover{' '}
                  <svg
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div
                  id="dropdownHover"
                  className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
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
                <>
                  {products.length ? (
                    <>
                      {sm ? (
                        <div className="grid grid-cols-2  gap-x-4">
                          {products.map((ad: IProduct) => (
                            <div className="min-h-96 font-roboto-regular mb-4 flex w-full cursor-pointer flex-col justify-between rounded-lg bg-white shadow">
                              <div className="relative flex h-[55%]">
                                <img
                                  src={`${baseURL}/${ad.imagesURL[0]}`}
                                  className="w-full rounded-t-lg object-contain object-top"
                                  alt={ad.name}
                                />
                              </div>
                              <div className="flex flex-col px-4 pb-6 pt-2">
                                <span className="font-roboto-bold text-primary text-xl">
                                  ETB {NumberWithCommas(ad.price)}
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
                          className={`grid gap-3 px-2 pr-0  md:grid-flow-row ${
                            list === 'Grid'
                              ? 'grid md:grid-cols-2 lg:grid-cols-3'
                              : 'md:grid-cols-1 lg:grid-cols-1'
                          }
`}
                        >
                          {/*      {products.map((ad: IProduct) => (
                            <NextLink href={`/products/${ad.id}`} passHref>
                              <div className="min-h-96 font-roboto-regular mb-4 flex w-full cursor-pointer flex-col justify-between rounded-lg bg-white shadow">
                                <div className="relative flex h-[55%]">
                                  <img
                                    src={`${baseURL}/${ad.imagesURL[0]}`}
                                    className="w-full rounded-t-lg object-contain object-top"
                                    alt={ad.name}
                                  />
                                </div>
                                <div className="flex flex-col px-4 pb-6 pt-2">
                                  <span className="font-roboto-bold text-primary text-xl">
                                    ETB {NumberWithCommas(ad.price)}
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
                          ))} */}
                          {products?.map((item: IProduct) => {
                            return (
                              <>
                                <ServiceCard
                                  description={item.description}
                                  title={item?.name}
                                  isOnline={true}
                                  onFavorite={undefined}
                                  onApply={undefined}
                                  views={item.viewCount}
                                  listType={list}
                                  rate={0}
                                  price={item.price}
                                  imageURL={item.imagesURL}
                                />
                              </>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Norecords />
                  )}
                </>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
