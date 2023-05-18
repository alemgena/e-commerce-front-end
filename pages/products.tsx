/* eslint-disable no-shadow */
import React, { useState } from 'react';
import type { NextPage } from 'next';

import ProductList from '@/components/productList/ProductList';
import { IProduct } from '@/lib/types/products';
import { useRouter } from 'next/router';
import { GET_SUB_CATEGORIE } from '@/types';
import Norecords from '@/components/Ui/Norecords';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
const subCategory: NextPage<{
  products: IProduct[];
}> = ({ }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const query = router.query;
  const categories = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
  const subCategorie = useSelector(
    (state: RootStateOrAny) => state.subCategories.subCategories
  );
  const [, setProduct] = useState<any>([]);
  let found: any;
  React.useEffect(() => {
    if (categories.data) {
      categories.data.map((items: any) => {
        if (items.subcategory.length) {
          found = items.subcategory.find(function (element: any) {
            return element.name == query.name;
          });
          if(found)
          dispatch({ type: GET_SUB_CATEGORIE, id: found.id });
        }
      });
    }
  }, [query.name, categories.data]);
  React.useEffect(() => {
    if (subCategorie.data) {
      setProduct(subCategorie.data);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      {subCategorie.data ? (
        <div>
          {subCategorie.data.product.length ? (
            <ProductList productList={subCategorie.data.product} />
          ) : (
            <Norecords />
          )}
        </div>
      ) : (
        <Norecords />
      )}
    </>
  );
};
export default subCategory;
