import { useState, useEffect } from 'react';
import { BiShare } from 'react-icons/bi';
import { BsChevronUp, BsFillChatLeftTextFill, BsHeart } from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { IoIosCall, IoIosCloseCircle } from 'react-icons/io';
import { MdOutlineReport } from 'react-icons/md';
import { Disclosure } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ADD_PRODUCT_FAVORITE } from '@/types';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Ur2, Url } from '@/utils/url';
import { RootStateOrAny, useSelector } from 'react-redux';
const Map = dynamic(() => import('@/components/map').then((mod) => mod.Map), {
  ssr: false,
});
const options = [
  {
    id: 'o-1',
    title: 'Spec',
  },
  {
    id: 'o-2',
    title: 'Materials',
  },
  {
    id: 'o-3',
    title: 'Dimention',
  },
  {
    id: '-4',
    title: 'Shipping',
  },
];

const colors = ['#ffffff', '#F62424', '#043CBE', '#5E5E5E', '#000000'];

function ProductDetailPage() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>();
  const router = useRouter();
  const { id } = router.query;
  const [activeImage, setActiveImage] = useState<any>([]);
  const [productImage, setProductImage] = useState();
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [showContact, setShowContact] = useState(false);
  const products = useSelector(
    (state: RootStateOrAny) => state.products.products
  );
  //favorite
  const favorite = useSelector(
    (state: RootStateOrAny) => state.favorite
  );
  useEffect(() => {
    if (products.data) {
      let found = products.data.find(function (element: any) {
        return element.id == id;
      });
      if (found) {
        setRelatedProducts(
          products.data.filter(
            (product: any) =>
              product.subCategory === found.subCategory &&
              product.id != found.id
          )
        );
        setProduct(found);
        setProductImage(found.imagesURL[0]);
        setActiveImage(found.imagesURL);
      }
    }
  }, [id]);
  const addFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    const favorite = {
      product: product.id,
    };
    dispatch({ type: ADD_PRODUCT_FAVORITE, data: favorite });
  };
  return (
    <>
      <Head>
        <title>Product Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="flex items-center gap-2 py-4  text-xl">
          <FiArrowLeft />
          <h2>Product Detail</h2>
        </div>
        <div className="grid grid-cols-2 gap-12 pb-20">
          <div>
            <img
              src={`${Ur2}/${productImage}`}
              width="960px"
              height="600px"
              className="overflow-hidden rounded-sm object-cover"
            />
            <div className="mt-6  grid grid-cols-4 gap-6">
              {activeImage.map((image:any) => (
                <img
                  src={`${Ur2}/${image}`}
                  width="full"
                  height="130px"
                  className={`cursor-pointer overflow-hidden rounded-sm object-cover ${
                    activeImage.id === image.id && 'ring-2 ring-blue-800'
                  } `}
                  onClick={() => setProductImage(image)}
                />
              ))}
            </div>
            <div className="mt-10 overflow-hidden rounded-sm">
              <Map center={[9.005401, 38.763611]} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-md bg-white px-4 py-6 shadow-sm">
              <h2 className="font-roboto-medium text-xl">Tesla Model X</h2>
              <p className="mb-4 text-sm text-blue-800">BelayAb Motors</p>
              <h2 className="font-roboto-light text-xl">{product?.price}</h2>
            </div>
            {showContact ? (
              <div className="flex items-center justify-between  rounded-md bg-white p-4 font-roboto-light shadow-sm">
                <div className="flex items-center gap-6">
                  <img
                    src="/images/product/product.png"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-roboto-medium text-sm">Abebe Kebede</h2>
                    <p className="font-roboto-medium   text-blue-800">
                      09 11 12 13 14
                    </p>
                  </div>
                </div>
                <IoIosCloseCircle
                  className="cursor-pointer text-2xl text-gray-400"
                  onClick={() => setShowContact(false)}
                />
              </div>
            ) : (
              <div className="flex gap-6 rounded-md bg-white p-4 font-roboto-light shadow-sm">
                <Link href="/chat">
                  <button className="flex-grow rounded-full bg-blue-800 py-2 text-white">
                    Make an Offer
                  </button>
                </Link>
                <button
                  onClick={() => setShowContact(true)}
                  className="flex items-center gap-2 rounded-full bg-white py-2 px-4 font-roboto-medium text-blue-800 ring-2 ring-blue-800"
                >
                  <IoIosCall />
                  <p>Call</p>
                </button>
                <button className="flex items-center gap-2 rounded-full bg-white py-2 px-4 font-roboto-medium text-blue-800 ring-2 ring-blue-800">
                  <BsFillChatLeftTextFill />
                  <p>Chat</p>
                </button>
                <button
                  onClick={(e) => addFavorite(e)}
                  className="flex items-center gap-2 py-2  font-roboto-light text-3xl text-gray-400"
                >
                  <BsHeart />
                </button>
                {favorite.favorite && <>product is add to favourite list</>}
                {favorite.error && <>{favorite.error.message}</>}
                <button className="flex items-center gap-2 py-2  font-roboto-light text-3xl text-gray-400">
                  <BiShare />
                </button>
                <button className="flex items-center gap-2 py-2  font-roboto-light text-3xl text-gray-400">
                  <MdOutlineReport />
                </button>
              </div>
            )}

            <div className="flex justify-between gap-6 rounded-md bg-white p-4 font-roboto-light shadow-sm">
              <div className="flex items-center gap-14">
                <h6 className="font-roboto-medium">Color</h6>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <div
                      key={index.toString()}
                      className="h-8 w-8 rounded-sm ring-1 ring-gray-100"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-1 rounded-full py-1 px-6 font-roboto-medium text-sm text-white ring-1 ring-blue-700">
                <p className="text-gray-500">In Stock</p>
                <p className="text-blue-800">60 Piece</p>
              </button>
            </div>
            <div className="rounded-md bg-white px-4 py-6 shadow-sm">
              <h2 className="mb-4 font-roboto-medium text-lg">Description</h2>
              <p className="text-sm text-gray-600">{product?.description}</p>
            </div>
            <div className="  rounded-md bg-white p-4 font-roboto-light shadow-sm">
              <h2 className="mb-4 font-roboto-bold text-lg">Store Detail</h2>
              <div className="flex items-center gap-6">
                <img
                  src={`${Url}/${productImage}`}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-roboto-medium text-lg">
                    Ambassador Clothing
                  </h2>
                  <p className="text-sm text-gray-400">
                    Mexico, Abebe Bldg - 4th Flr, Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white font-roboto-light shadow-sm">
              {options.map((option) => (
                <Disclosure key={option.id}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="text-blac flex w-full  justify-between border-b-2 border-gray-100 p-4 text-left font-roboto-bold  text-lg">
                        <span>{option.title}</span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 `}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2  text-gray-500">
                        If you're unhappy with your purchase for any reason,
                        email us within 90 days and we'll refund you in full, no
                        questions asked.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="font-roboto-bold text-xl">RELATED PRODUCTS</h2>
          <div className="flex w-full gap-4 overflow-x-auto scrollbar-hide">
            {relatedProducts.map((data: any) => (
              <div key={data.toString()} className="w-52 flex-shrink-0">
                <img
                  src={`${Ur2}/${data.imagesURL[0]}`}
                  className="h-52 w-full object-cover"
                />
                <div className="bg-white">
                  <div className="flex flex-col gap-3 p-2">
                    <h6 className="text-sm text-gray-500">{data.name}</h6>
                    <div className="flex items-center justify-between">
                      <h6 className="font-roboto-bold ">{data.price}</h6>
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
    </>
  );
}

export default ProductDetailPage;