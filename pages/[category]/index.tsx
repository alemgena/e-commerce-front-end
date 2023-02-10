/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{useEffect,useState} from 'react';
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import Breadcrumb from '@/components/BreadCrumb';
import {RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Ur2, Url } from '@/utils/url';
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
  const[subCategories,setSubCategories]=useState<any>([])
  const query = router.query;
  const categories = useSelector((state:RootStateOrAny) => state.categories.categories);
  useEffect(() => {
    if(categories.data && query.name){
      var found = categories.data.find(function (element:any) {
        return element.name == query.name;
    });
    setSubCategories(found.subcategory)
    }
  }, [query.name]);
  return(
  <>
    <Breadcrumb />
    <div className="ml-30 mt-20 grid grid-cols-6 gap-2 pl-20">
      { subCategories.map((data:any) => (
        <div>
          <Link  
       href={{pathname: "/category/subCategory",
       query:{name:data.name}}}>
            <div className="h-30 relative block w-40 rounded-full bg-gray-50">
              <img
                alt="name"
                src={`${Ur2}/${data.imageURL[0]}`}
                className="h-36 w-36 rounded-full object-none object-[59%_-4px] py-5"
              />
            </div>
          </Link>
          <h1 className="py-4 px-9 font-bold">{data.name}</h1>
        </div>
      ))} 
    </div>
  </>
  )
};

export default categoryPage;
