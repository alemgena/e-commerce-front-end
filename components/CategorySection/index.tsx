/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const index = () => (
  <div className="ml-30 mt-20 grid grid-cols-6 gap-2 pl-20">
    {[1, 2, 3, 4, 5, 6, 7, 8, 55, 5666, 75, 666].map((data) => (
      <div>
        <a
          href="#"
          className="h-30 relative block w-40 rounded-full bg-gray-100"
        >
          <img
            alt="name"
            src="/images/laptop-transparent-png-pictures-icons-and-png-40.png"
            className="h-36 w-36 rounded-full object-none object-[59%_-4px] py-5"
          />
        </a>

        <h1 className="py-4 px-9 font-bold">Clothing</h1>
      </div>
    ))}
  </div>
);

export default index;
