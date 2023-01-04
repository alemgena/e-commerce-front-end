import Head from 'next/head';
import { BsHeart } from 'react-icons/bs';

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>Search Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" min-h-[86vh] bg-gray-50 py-6  px-12">
        <div className="flex gap-2 rounded-md bg-white px-4 py-5 font-roboto-regular text-xl text-gray-400">
          <h4>Showing Result For</h4>
          <h4 className="text-gray-800">Laptop</h4>
        </div>
        <div className="mt-16 flex gap-14">
          <div className="flex h-56 w-1/4 flex-col gap-10 bg-white p-8 shadow-md ">
            <div className="flex flex-col gap-4">
              <h6 className="font-roboto-regular">Price Range Per Night</h6>
              <input type="range" min={0} max={10000} />
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-roboto-regular">Color</h6>
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border px-4 py-1 font-roboto-regular text-sm">
                  <p>Red</p>
                </div>
                <div className="rounded-full border px-4 py-1 font-roboto-regular text-sm">
                  <p>Green</p>
                </div>
                <div className="rounded-full border px-4 py-1 font-roboto-regular text-sm">
                  <p>Pink</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/4">
            <h3 className="border-b font-roboto-medium text-xl leading-10">
              ALL PRODUCTS
            </h3>
            <div className="mt-8 grid grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data) => (
                <div key={data.toString()} className="w-full">
                  <img
                    src="/images/product/related-product.png"
                    className="h-52 w-full object-cover"
                  />
                  <div className="bg-white">
                    <div className="flex flex-col gap-3 p-2">
                      <h6 className="text-sm text-gray-500">Samsung A51</h6>
                      <div className="flex items-center justify-between">
                        <h6 className="font-roboto-bold ">19,450 ETB</h6>
                        <h6 className="rounded-full bg-gray-100 px-3 py-1">
                          Used
                        </h6>
                      </div>
                    </div>
                    <div className="h-0.5 w-full bg-gray-200" />
                    <div className="flex  gap-6  rounded-md p-2 font-roboto-light">
                      <button className=" rounded-full bg-blue-800 px-3 py-2 text-sm text-white">
                        Make Offer
                      </button>

                      <button className="flex flex-grow items-center justify-center  font-roboto-light text-xl text-gray-400">
                        <BsHeart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
