/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

function CategoryShop() {
  return (
    <div className=" px-15 bg-white pb-20 pt-10">
      <h2 className="rounded-md  bg-white py-3 pl-2 font-bold shadow-sm">
        SHOP BY CATEGORY
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data) => (
          <div
            key={data.toString()}
            className="p-50 h-52 w-52 w-full max-w-sm flex-shrink-0 rounded-lg border border-gray-200 bg-white pb-10 shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <img
              src="/images/NoPath - Copy (3).png"
              className="h-52 w-full object-cover"
            />

            <h1 className="text-center text-lg font-bold text-gray-500">
              Digital
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryShop;
