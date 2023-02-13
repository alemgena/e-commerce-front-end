/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect,useState} from 'react';
import { BsHeart } from 'react-icons/bs';
import Link from 'next/link';
import {RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {GET_PRODUCTS_BY_FEATURED} from '../../types'
import { Url } from '@/utils/url';
import NextLink from 'next/link';
export interface IProduct {
  image: any;
  name: string;

  price: number;
  discount?: number;

  brand: string;
  category: string[];
  isOffer?: boolean;
  registerDate?: string;
  timeStamp?: number;
  starRating: number;
}
function Featured() {
  const[productData,setProductData]=useState<any>([])
  const dispatch = useDispatch();
  const products = useSelector((state:RootStateOrAny) => state.featuredProducts.featuredProducts);
  useEffect(() => {
  //  dispatch({ type: GET_PRODUCTS_BY_FEATURED, featured: true })
  }, []);
  useEffect(() => {
  if(products.data){
setProductData(products.data)
  }
  }, [products]);
  return (
    <div className=" -ml-10  mr-12  bg-white px-12 pb-20 pt-10">
      <h2 className="rounded-md  bg-white py-3 pl-2 font-bold shadow-sm">
        FEATURED PRODUCTS
      </h2>
      <div className="flex flex-col gap-8">
        <div className="grid gap-y-5 gap-x-10 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 ">
          {productData.map((data: any) => (
            <NextLink href={`/products/${data.id}`} passHref>
              <div key={data.toString()} className="mr-96 w-52 ">
                <img
                  src={`${Url}/${data.imagesURL[0]}`}
                  className="h-52 w-full object-cover"
                />
                <div className="bg-white">
                  <div className="flex flex-col gap-3 p-2">
                    <h6 className="text-sm text-gray-500">{data.name}</h6>
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
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;
