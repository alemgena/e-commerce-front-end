import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';

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
  <div>
    <ProductList productList={products} />
  </div>
);

export default categoryPage;
