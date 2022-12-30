/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Breadcrumb from '../BreadCrumb';
import Card from '../Card';

import SubmenuCategory from './SubmenuCategory';

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
interface Props {
  productList: IProduct[];
}
const ProductList: React.FC<Props> = ({ productList }) => {
  const router = useRouter();
  const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('all');
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedRadioBtn(e.currentTarget.id);
  }

  return (
    <div>
      <Breadcrumb />
      <SubmenuCategory />
      <div className="mx-auto w-full xl:max-w-[2100px]">
        <div className="grid grid-cols-6 gap-4 md:grid-cols-12 md:gap-2">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
