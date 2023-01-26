/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{useEffect,useState} from 'react';
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import Breadcrumb from '@/components/BreadCrumb';
import menuItems from '@/mock/menuItems';
import ProductList from '../../components/productList/ProductList';
import {RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {GET_SUB_CATEGORIES} from '../../types'
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
const categoryPage: NextPage<{
  products: IProduct[];
}> = ({ products }) => {
  const router = useRouter();
  const query = router.query;
  console.log(query.id)
  const dispatch = useDispatch();
  //const products = useSelector((state:RootStateOrAny) => state.featuredProducts.featuredProducts);
  useEffect(() => {
    dispatch({ type: GET_SUB_CATEGORIES, category: query.id})
  }, [query.id]);
  return(
  <>
    <Breadcrumb />
    <div className="ml-30 mt-20 grid grid-cols-6 gap-2 pl-20">
      {menuItems.map((data) => (
        <div>
          <Link href="/category/cars">
            <div className="h-30 relative block w-40 rounded-full bg-gray-50">
              <img
                alt="name"
                src={`/images/${data.categoryImg}`}
                className="h-36 w-36 rounded-full object-none object-[59%_-4px] py-5"
              />
            </div>
          </Link>
          <h1 className="py-4 px-9 font-bold">{data.category}</h1>
        </div>
      ))}
    </div>
  </>
  )
};

export default categoryPage;
