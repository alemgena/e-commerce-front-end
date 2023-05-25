import howToBuy from '../public/animations/how-to-buy.json';
import howToSell from '../public/animations/how-to-sell.json';
import security from '../public/animations/security.json';
import about from '../public/animations/about.json';
import { useRouter } from 'next/router';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), {
  ssr: false,
});

export default function AboutUs() {
  const HowtoBuyAnimation = {
    loop: true,
    autoplay: true,
    animationData: howToBuy,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const howTosellAnimation = {
    loop: true,
    autoplay: true,
    animationData: howToSell,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const securityAnimation = {
    loop: true,
    autoplay: true,
    animationData: security,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const aboutAnimation = {
    loop: true,
    autoplay: true,
    animationData: about,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const router = useRouter();
  return (
    <>
      {typeof window !== undefined ? (
        <>
          <div className="mx-24 flex justify-center">
            <div className="h-min-height-100 h-width-100p mx-30 mx-auto text-left">
              <div className=" h-pv-15 h-ph-15 h-mv-20 b-static-page">
                <div className="h-p-20">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="p-6">
                      <h1 className="text-xl font-bold">
                        LIYU DIGITAL TECHNOLOGY
                      </h1>
                      <p className="text-xl">
                        is an Ethiopian technology company specializing in e-
                        commerce, retail, internet and technology. Founded on
                        2022 in Addis Ababa, the company provides consumer to
                        consumer (C2C), business to consumer (B2C), and business
                        to business (B2B) sales services via web portal and
                        mobile application, as well as electronic payment
                        services, shopping search engines and cloud computing
                        services.
                      </p>

                      <div className="ml-0 mt-4">
                        <p className="">Tables of Content</p>
                        <div className=" bg-gray-20 my-2 ">
                          <a
                            href="#howtosell"
                            className="block h-full bg-gray-200 px-4 py-2 font-bold"
                          >
                            How To Sell On Liyu
                          </a>
                        </div>

                        <div className=" bg-gray-20 my-2 ">
                          <a
                            href="#howtobuy"
                            className="block h-full bg-gray-200 px-4 py-2 font-bold"
                          >
                            How to Buy On Liyu
                          </a>
                        </div>

                        <div className=" bg-gray-20 my-2  ">
                          <a
                            href="#security"
                            className="block h-full bg-gray-200 px-4 py-2 font-bold"
                          >
                            Safety Tips
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className=" p-6">
                      <p className="text-gray-700">
                        <Lottie options={aboutAnimation} />
                      </p>
                    </div>

                    <div id="howtosell" className="p-6">
                      <p className="text-gray-700">
                        <Lottie options={howTosellAnimation} />
                      </p>
                    </div>

                    <div className=" p-6">
                      <h1 className="mb-4 text-xl font-bold">
                        How to sell on Liyu Market?
                      </h1>
                      <h1 className="flex text-xl font-bold">
                        1.
                        <a
                          className="text-xl font-bold text-primary-500 hover:cursor-pointer hover:underline"
                          onClick={() => router.push('/register')}
                        >
                          Register
                        </a>
                      </h1>
                      <p className="text-xl">
                        {' '}
                        Register using your e-mail and phone number (or do it
                        via Facebook or Google). Make sure you’re entering a
                        correct phone number, so your clients could reach you!
                      </p>
                      <h1 className="mt-4 text-xl font-bold">
                        2. Make photos of your item.{' '}
                      </h1>
                      <p
                        className="text-xl
                  "
                      >
                        Feel free to make a lot of photos using your smartphone.
                        Make sure they show your item in the best light.
                      </p>
                      <h1 className="mt-4 text-xl font-bold">
                        {' '}
                        3. Press
                        <a
                          onClick={() => router.push('/sell/products/create')}
                          className="ml-2 text-primary-700 hover:cursor-pointer"
                        >
                          Sell
                        </a>
                      </h1>
                      <p className="text-xl">
                        Choose a proper category, upload your photos and write a
                        clear title and full description of your item. Enter a
                        fair price, select attributes and send your advert to
                        review!
                      </p>
                      <h1 className="mt-4 text-xl font-bold ">4.Answer</h1>
                      <p className="text-xl">
                        the messages and calls from your clients! If everything
                        is ok with your advert, it’ll be on liyu in a couple of
                        hours after sending to moderation. We’ll send you a
                        letter and notification when your advert goes live.
                        Check your messages and be ready to earn money!
                      </p>
                      <button
                        onClick={() => router.push('/sell/products/create')}
                        className="w-200 mt-2 hidden items-center gap-3  
                    rounded bg-blue-500 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500
                     px-4 px-4 py-1 font-bold text-white text-white hover:bg-blue-700 lg:flex"
                      >
                        <AiOutlinePlusCircle size={20} /> <p>Sell</p>
                      </button>
                    </div>
                    <div id="howtobuy" className=" p-0">
                      <div className="p-0">
                        <p className="mb-2 text-xl font-bold">
                          How to Buy on Liyu Market?
                        </p>
                        <ol className="">
                          <li className="mb-2">
                            <p className="text-xl font-bold">
                              1. Search for the item.
                            </p>
                            <p className="text-xl">
                              Find what you need using search panel and filters.
                              We have over a million adverts, choose exactly
                              what you are looking for.
                            </p>
                          </li>
                          <li className="mb-2">
                            <p className="text-xl font-bold">
                              2. Contact a seller.
                            </p>
                            <p className="text-xl">
                              You may use chat on liyu or call them via phone.
                              Discuss all the details, negotiate about the
                              price.
                            </p>
                          </li>
                          <li className="mb-2 text-xl">
                            <p className="text-xl font-bold">
                              3. Take your item or order a delivery.
                            </p>
                            <p className="text-xl">
                              We check our sellers carefully, but it’s always
                              better to check twice, right? Meet a seller in
                              public place and be sure to pay only after
                              collecting your item.
                            </p>
                          </li>
                          <li className="mb-2 mt-2">
                            <p className="text-xl font-bold">
                              4. Leave your feedback about the seller.
                            </p>
                            <p className="text-xl">
                              Feel free to tell us about your purchase. Your
                              feedback will be published online on the seller’s
                              page and will be very helpful for other buyers.
                              Let’s build a safe and professional business
                              community together!
                            </p>
                          </li>
                        </ol>
                      </div>
                      <button
                        onClick={() => router.push('/')}
                        className="w-200 mt-2 hidden items-center 
                    rounded bg-blue-500 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500
                     px-4 px-4 py-1 font-bold text-white text-white hover:bg-blue-700 lg:flex"
                      >
                        <AiOutlinePlusCircle size={20} /> <p>Go Shopping</p>
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700">
                        <Lottie options={HowtoBuyAnimation} />
                      </p>
                    </div>

                    <div className="p-0">
                      <p className="h-25 text-gray-700">
                        <Lottie options={securityAnimation} />
                      </p>
                    </div>
                    <div id="security">
                      <h1 className="text-xl font-bold">Safety</h1>
                      <div className="bg-gray-100 p-4">
                        <h1 className="text-xl font-bold">General</h1>
                        <p className="text-xl">
                          We are highly focused on security and can solve any
                          issues in short terms.
                        </p>
                        <p className="text-xl">
                          That's why we kindly ask you to leave a review after
                          purchasing. If you have any problems with a seller,
                          please report it to us and our team will check the
                          seller as soon as possible.
                        </p>
                      </div>
                      <div className="bg-gray-100 p-4">
                        <p className="text-xl font-bold">
                          Personal Safety Tips:
                        </p>
                        <ul className="list-inside list-disc text-xl">
                          <li>Do not pay in advance, even for delivery.</li>
                          <li>Try to meet at a safe, public location.</li>
                          <li>Check the item BEFORE you buy it.</li>
                          <li>Pay only after collecting the item.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <ul></ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
