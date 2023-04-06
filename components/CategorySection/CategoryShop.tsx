/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Link from 'next/link';

import menuItems from '@/mock/menuItems';

function CategoryShop() {
  return (
    <div className=" py-18 bg-white px-12">
      <h2 className="rounded-md  bg-white py-3 pl-2 font-bold shadow-sm">
        SHOP BY CATEGORY
      </h2>
      <div className="grid grid-cols-4 gap-y-8 gap-x-1 bg-white">
        {menuItems.map((data) => (
          <Link
            href={`categories/${data.category}`}
            key={data.toString()}
            className=" h-45 rounded-lg border border-gray-200 bg-white pb-10 shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="w-full rounded-lg  bg-gray-50  shadow-md shadow-gray-300 lg:max-w-sm">
              <img
                className="h-72 w-full  bg-white object-cover"
                src={`/images/${data.categoryImg}`}
                alt="image"
              />
              <div className="p-4">
                <h4 className="py-3 text-center text-xl font-semibold tracking-tight">
                  {data.category}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryShop;
