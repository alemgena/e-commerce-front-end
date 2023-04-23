import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

const NotificationsPage = () => {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Notification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div
          onClick={() => router.push('/')}
          className="mb-4 flex items-center gap-2 py-4 text-xl  hover:cursor-pointer"
        >
          <FiArrowLeft />
          <h2 className="font-roboto-medium ">Notification</h2>
        </div>
        <h4 className="font-roboto-regular">New</h4>
        <div className="mt-4 flex flex-col gap-8">
          {[1, 2].map((_, idx) => (
            <div
              key={idx.toString()}
              className=" flex items-center justify-between gap-12 bg-white px-6 py-8"
            >
              <div className="overflow-hidden rounded-full">
                <img
                  src="/images/product/product.png"
                  className="h-16 w-16 "
                  alt="product image"
                />
              </div>
              <div className="flex w-2/3 flex-grow flex-col gap-2">
                <h6 className=" font-roboto-medium text-lg text-blue-800">
                  Product Created
                </h6>
                <h3 className="font-roboto-light text-sm text-gray-500">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </h3>
              </div>
              <div className="font-roboto-regular self-end whitespace-nowrap text-sm text-gray-600">
                <p>5 Min</p>
              </div>
            </div>
          ))}
        </div>
        <h4 className="font-roboto-regular mt-8">Yesterday</h4>
        <div className="mt-4 flex flex-col gap-8">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx.toString()}
              className=" flex items-center justify-between gap-12 bg-white px-6 py-8"
            >
              <div className="overflow-hidden rounded-full">
                <img
                  src="/images/product/product.png"
                  className="h-16 w-16 "
                  alt="product image"
                />
              </div>
              <div className="flex w-2/3 flex-grow flex-col gap-2">
                <h6 className=" font-roboto-medium text-lg text-gray-600">
                  Product Created
                </h6>
                <h3 className="font-roboto-light text-sm text-gray-500">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </h3>
              </div>
              <div className="font-roboto-regular self-end whitespace-nowrap text-sm text-gray-600">
                <p>5 Min</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
