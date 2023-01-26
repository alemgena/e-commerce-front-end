/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import Link from 'next/link';

import menuItems from '@/mock/menuItems';
import { RootStateOrAny,useDispatch, useSelector } from "react-redux";
import {GET_CATEGORIES} from '../../types'
const index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_CATEGORIES })
  }, []);
  return(
  <div className="ml-30 mt-20 grid grid-cols-6 gap-2 pl-20">
    {menuItems.map((data) => (
      <div>
        <Link  href={{
            pathname: "/subcategory",
            query:{id: "63b4814aa17482b61cefe62d"}, // the data
          }}>
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
)
    }

export default index;
