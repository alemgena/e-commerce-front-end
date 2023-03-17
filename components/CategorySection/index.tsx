/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import { baseURL } from '@/config';
import { RootStateOrAny, useSelector } from "react-redux";
import Router, { useRouter } from 'next/router'
import NextLink from 'next/link';
import { json } from 'stream/consumers';
const index = () => {
  const categories = useSelector((state:RootStateOrAny) => state.categories.categories);
  return (
    <div className="md:ml-30 mt-20 grid gap-2 pl-20 sm:ml-0 sm:mr-10  sm:grid-cols-4">
      {categories.data && (
        <>
          {categories.data.map((data: any) => (
            <div>
              <Link
                href={{
                  pathname: 'subcategory',
                  query: { name: data.name },
                }}
              >
                <div className="h-30 relative block w-40 rounded-full bg-gray-50">
                  <img
                    alt="name"
                    src={`${baseURL}/${data.imageURL}`}
                    className="h-36 w-36 rounded-full object-none object-[59%_-4px] py-5"
                  />
                </div>
              </Link>
              <h1 className="py-4 px-9 font-bold">{data.name}</h1>
            </div>
          ))}
        </>
      )}
    </div>
  );
    }

export default index;
