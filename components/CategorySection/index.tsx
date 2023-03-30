/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { baseURL } from '@/config';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

const index = () => {
  const categories = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
  return (
    <div className="mt-2 grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-5 lg:hidden">
      {categories.data && (
        <>
          {categories.data.map((data: any) => (
            <div className="flex w-full cursor-pointer flex-col items-center  justify-center gap-4 rounded bg-white text-gray-700">
              <Link
                href={{
                  pathname: 'subcategory',
                  query: { name: data.name },
                }}
              >
                <img
                  alt="name"
                  src={`${baseURL}/${data.imageURL}`}
                  // className="rounded-full object-none object-[59%_-4px] py-5"
                />
              </Link>
              <h1 className="font-bold">{data.name}</h1>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default index;
