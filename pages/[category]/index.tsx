import React, { useState } from 'react';
import { FaThList } from 'react-icons/fa';
import { TbArrowsSort } from 'react-icons/tb';
import { BsSortAlphaDownAlt, BsSortAlphaUp } from 'react-icons/bs';
import { TfiLayoutGrid3Alt } from 'react-icons/tfi';
import type { NextPage } from 'next';
import Breadcrumb from '@/components/BreadCrumb';
import { useRouter } from 'next/router';
import Norecords from '@/components/Ui/Norecords';
import Link from 'next/link';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { baseURL } from '@/config';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import PageSpinner from '@/components/Ui/PageSpinner';
import Notification from '@/components/Ui/Notification';
import Notify from '@/components/Ui/Notify';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import ProductCard from '@/components/Card/product-card';
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
  views: number;
  viewCount?: number;
  region: string;
}

type carProp = {
  name: string;
  url: string;
};
const CategoryPage: NextPage = () => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const [list, setList] = useState('Grid');
  const apiKey = 'AIzaSyDdfMxmTxz8u1XdD99_JCEX_9S41PbcJPE';
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
  const [options, setOptions] = React.useState<any>([]);
  console.log('count', products);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [productByOption, setProductByOptin] = React.useState<any>([]);
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
          setOptions(found.options);
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
      console.log('from', from);
      console.log('to', to);
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
  const prices = [
    { id: 1, label: '< ETB 500K', from: 1, to: 500000 },
    { id: 2, label: 'ETB 500K - 1M', from: 500001, to: 1000000 },
    { id: 3, label: 'ETB 1M - 2M', from: 1000001, to: 2000000 },
    { id: 4, label: 'ETB 2M+', from: 2000001, to: Number.MAX_SAFE_INTEGER },
  ];
  const [selectedPrice, setSelectedPrice] = useState(prices[0].id);
  const [sortOrder, setSortOrder] = useState('asc'); // default sorting order is ascending

  const handlePriceChange = (event: any) => {
    setClickValues(false);
    setSelectedPrice(event.target.value);
    const price = prices.find((p: any) => p.id === event.target.value);
    if (price) {
      searchByPrice(price?.from, price?.to);
    }
  };
  const handleSortByPrice = () => {
    let sortedProducts = [];

    if (sortOrder === 'asc') {
      sortedProducts = products.sort(
        (a: { price: number }, b: { price: number }) => a.price - b.price
      );
      setSortOrder('desc');
    } else {
      sortedProducts = products.sort(
        (a: { price: number }, b: { price: number }) => b.price - a.price
      );
      setSortOrder('asc');
    }

    setProducts([...sortedProducts]);
  };
  const [clickValues, setClickValues] = React.useState<boolean>(false);
const [values,setValues]=useState<any>('')
  const handleChange = async (event: any) => {
    setClickValues(true);
    setValues(event.target.value)
    let optionName = findOptionNameByValue(event.target.value);
    const filteredProducts = getProductsByOptionValue(
      products,
      optionName,
      event.target.value
    );
    setProductByOptin(filteredProducts);
  };
  function findOptionNameByValue(value: string) {
    for (const option of options) {
      for (const optionValue of option.values) {
        if (optionValue.value === value) {
          return option.id.name;
        }
      }
    }

    return null;
  }
  function getProductsByOptionValue(
    products: any,
    optionName: any,
    optionValue: any
  ) {
    const filteredProducts = [];
    for (const product of products) {
      for (const option of product.options) {
        const optionValueExists = option.values.some(
          (value: any) => value.value === optionValue
        );

        if (option.name === optionName && optionValueExists) {
          filteredProducts.push(product);
          break; // We can break here since the product has the desired option value
        }
      }
    }

    return filteredProducts;
  }
  console.log('products', products);
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
                        <div key={item.id}>
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
              <>
                <div className="mt-4  grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {options.map((item: any) => (
                    <>
                      {item.values.length > 0 ? (
                        <div className="w-40 lg:w-52 md:w-48">
                          <FormControl fullWidth>
                            <InputLabel
                              className="absolute  bg-white px-1"
                              margin="dense"
                            >
                              <span className="font-bold ">{item.name}</span>
                            </InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              label={item.name}
                              value={values}
                              onChange={handleChange}
                            >
                              {item.values.map((data: any) => (
                                <MenuItem value={data.value}>
                                  {data.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ) : null}
                    </>
                  ))}
                </div>
                <div className=" mt-2 flex w-full flex-col items-center justify-between bg-gray-200 px-2 py-2 md:flex-row lg:flex-row">
                  <div className=" mb-2 flex gap-x-3 sm:mb-0">
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
                  <div className="flex flex-col items-center gap-x-1 md:flex-row">
                    <span className="hidden text-xl md:block">
                      Filter By Price:
                    </span>
                    <Select
                      value={selectedPrice || ''}
                      onChange={handlePriceChange}
                      displayEmpty
                      sx={{
                        height: '2.5rem', // Set the height to 2.5rem
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        padding: '0.5rem 1rem',
                        appearance: 'none',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        border: '1px solid #d2d6dc',
                        '&:focus': {
                          outline: 'none',
                          borderColor: '#4c9aff',
                          boxShadow: '0 0 0 3px rgba(76, 154, 255, 0.25)',
                        },
                      }}
                    >
                      {prices.map((price) => (
                        <MenuItem key={price.id} value={price.id}>
                          {price.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex items-center gap-x-2 text-gray-600 lg:mb-0">
                    <button
                      onClick={handleSortByPrice}
                      className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <div className="flex items-center  gap-x-1">
                        {sortOrder == 'asc' ? (
                          <BsSortAlphaDownAlt
                            size={18}
                            className="text-primary"
                          />
                        ) : (
                          <BsSortAlphaUp size={18} className="text-primary" />
                        )}
                        <span>
                          {sortOrder === 'asc'
                            ? 'Price (low to high)'
                            : 'Price (high to low)'}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
              {clickValues ? (
                <>
               <div className="mt-5 flex w-full flex-col">
                  <>
                    {productByOption.length ? (
                      <>
                        <div
                          className={`grid gap-3 px-2 pr-0  md:grid-flow-row ${
                            list === 'Grid'
                              ? 'grid md:grid-cols-2 lg:grid-cols-3'
                              : 'md:grid-cols-1 lg:grid-cols-1'
                          }`}
                        >
                          {productByOption?.map((item: IProduct) => {
                            return (
                              <>
                                {item.imagesURL.length > 0 && (
                                  <ProductCard
                                    description={item.description}
                                    title={item.name}
                                    views={item.viewCount}
                                    price={item.price}
                                    listType={list}
                                    id={item.id}
                                    imageUrl={`${baseURL}${item.imagesURL[0]}`}
                                    region={item?.region}
                                  />
                                )}
                              </>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <Norecords />
                    )}
                  </>
                </div>
                </>
              ) : (
                <div className="mt-5 flex w-full flex-col">
                  <>
                    {products.length ? (
                      <>
                        <div
                          className={`grid gap-3 px-2 pr-0  md:grid-flow-row ${
                            list === 'Grid'
                              ? 'grid md:grid-cols-2 lg:grid-cols-3'
                              : 'md:grid-cols-1 lg:grid-cols-1'
                          }`}
                        >
                          {products?.map((item: IProduct) => {
                            return (
                              <>
                                {item.imagesURL.length > 0 && (
                                  <ProductCard
                                    description={item.description}
                                    title={item.name}
                                    views={item.viewCount}
                                    price={item.price}
                                    listType={list}
                                    id={item.id}
                                    imageUrl={`${baseURL}${item.imagesURL[0]}`}
                                    region={item?.region}
                                  />
                                )}
                              </>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <Norecords />
                    )}
                  </>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
