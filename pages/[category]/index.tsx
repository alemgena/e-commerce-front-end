/* eslint-disable jsx-a11y/img-redundant-alt */
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import Breadcrumb from '@/components/BreadCrumb';
import menuItems from '@/mock/menuItems';
import ProductList from '../../components/productList/ProductList';

export interface IProduct {
  image: any;
  name: string;
  price: number;
  discount?: number;
  brand: string;
  category: string[];
  isOffer?: boolean;
  registerDate?: string;
  timeStamp?: number;
  starRating: number;
}

const categoryPage: NextPage<{
  products: IProduct[];
}> = ({ products }) => (
  <>
    <Breadcrumb />
    <div className="ml-30 mb-20 mt-5 grid grid-cols-6 gap-2 pl-20">
      {menuItems.map((data) => (
        <div>
          <Link href="/category/cars">
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
  </>
);

export default categoryPage;
