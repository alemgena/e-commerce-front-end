/* eslint-disable react/function-component-definition */
import React, {  useState } from 'react';
import { useRouter } from 'next/router';

import Breadcrumb from '../BreadCrumb';
import Card from '../Card';
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
const ProductList: React.FC<Props> = ({productList}) => {
  const router = useRouter();
  const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('all');
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedRadioBtn(e.currentTarget.id);
  }
  return (
    <div>
      <Breadcrumb />
      <div className="mb-52 w-full xl:max-w-[2100px]">
        <div className="grid grid-cols-6 gap-4 md:grid-cols-12 md:gap-2">
          {productList?.map((data, index) => (
            <Card key={index} product={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
