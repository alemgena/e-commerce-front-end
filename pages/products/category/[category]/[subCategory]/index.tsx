/* eslint-disable no-shadow */
import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';

import ProductList from '@/components/productList/ProductList';
import { ISubCategoryPathsParams } from '@/lib/types/pagePathsParams';
import { IProduct } from '@/lib/types/products';

const subCategory: NextPage<{
  products: IProduct[];
}> = ({ products }) => (
  <div>
    <ProductList productList={products} />
  </div>
);

export default subCategory;
