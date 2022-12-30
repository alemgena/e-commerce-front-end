/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const featuredShop = () => (
  <div className=" bg-white px-12 pb-12">
    <h2 className="mb-5 rounded-md bg-white pl-2 font-bold shadow-sm">
      FEATURED SHOP
    </h2>
    <div className="flex flex-col gap-8">
      <div className="flex w-full gap-4 overflow-x-auto scrollbar-hide">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data) => (
          <div key={data.toString()} className="w-52 flex-shrink-0">
            <img
              src="/images/NoPath-6@2x.png"
              className="h-52 w-full rounded-full object-cover"
            />
            <div className="bg-white">
              <div className="flex flex-col gap-0 p-1 ">
                <h6 className="text-center text-lg font-bold">Abebe shop</h6>
                <p className="my-0  text-center text-sm">390 Products</p>
                <button className="  mx-7 rounded-full bg-blue-800 px-1 py-1 text-sm text-white">
                  <p className="">View products</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default featuredShop;
