/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import { Url } from '../../utils/url';
import { RootStateOrAny, useSelector } from "react-redux";
import Router, { useRouter } from 'next/router'
const index = () => {
  const[categoriesData,setCategoriesData]=useState<any>([])
  const categories = useSelector((state:RootStateOrAny) => state.categories.categories);
  useEffect(() => {
    if(categories.data){
      setCategoriesData(categories.data)
    }
  }, [categories.data]);
  return(
  <div className="ml-30 mt-20 grid grid-cols-6 gap-2 pl-20">
    {categoriesData.map((data:any) => (
      <div>
        <div  onClick={(e:any) => {
        e.stopPropagation();
        Router.push({
          pathname: '/subcategory',
          query: { state: JSON.stringify(data.subCategory) }
      },'/subcategory')
    }}>
          <div className="h-30 relative block w-40 rounded-full bg-gray-50">
            <img
              alt="name"
              src={`${Url}/${data.imageURL}`}
              className="h-36 w-36 rounded-full object-none object-[59%_-4px] py-5"
            />
          </div>
        </div>

        <h1 className="py-4 px-9 font-bold">{data.name}</h1>
      </div>
    ))}
  </div>
)
    }

export default index;
