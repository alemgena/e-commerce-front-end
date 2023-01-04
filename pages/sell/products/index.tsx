import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';
import { RiPencilFill } from 'react-icons/ri';
import { AiFillMinusCircle } from 'react-icons/ai';
import { FaEye, FaShare } from 'react-icons/fa';

const ProductsPage = () => {
  return (
    <>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="flex items-center gap-2 py-4  text-xl">
          <FiArrowLeft />
          <h2>My Items</h2>
        </div>
        <div className="mt-4 flex flex-col gap-8">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx.toString()}
              className=" flex items-center justify-between gap-14 bg-white pr-8"
            >
              <div>
                <img
                  src="/images/product/related-product.png"
                  className="h-32 w-56"
                  alt="product image"
                />
              </div>

              <div className="flex flex-grow flex-col gap-4">
                <h6 className="fontr\ text-sm text-gray-600">
                  Samsung A51 12GB RAM / 64 GB Storage
                </h6>
                <h3 className="font-roboto-bold text-lg">12,462 ETB</h3>
              </div>
              <div className="flex flex-grow gap-10">
                <div className="flex items-center gap-2">
                  <FaEye size={20} className="text-blue-800" />
                  <p className="font-roboto-regular text-sm">128 Views</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaShare size={20} className="text-blue-800" />
                  <p className="font-roboto-regular text-sm">45 Share</p>
                </div>
              </div>
              <div className="flex justify-between gap-10 bg-gray-100 px-10 py-4">
                <RiPencilFill size={25} className="cursor-pointer" />
                <AiFillMinusCircle size={25} className="cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
