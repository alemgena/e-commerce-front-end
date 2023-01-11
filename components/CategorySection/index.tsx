/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

import menuItems from '@/mock/menuItems';

const index = () => (
  <div className="ml-30 mt-20 grid grid-cols-6 gap-2 pl-20">
    {menuItems.map((data) => (
      <div>
        <Link href="/products/category/cars/toyota">
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
);

export default index;
