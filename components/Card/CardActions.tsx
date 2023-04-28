/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  RiHeartAddLine,
  RiShareLine,
  RiShoppingCart2Line,
} from 'react-icons/ri';

import { IProduct } from '../../lib/types/products';

interface Props {
  product: IProduct;
}

const CardActions: React.FC<Props> = ({ product }) => {
  const FavoriteIcon = RiHeartAddLine;
  console.log(product);

  return (
    <div className=" bg-white-700 absolute bottom-2 left-0 z-50 mt-2 flex w-1/2 justify-around self-center rounded-lg  p-2 shadow-lg backdrop-blur-[8px]  backdrop-filter md:-top-2 md:bottom-auto md:-left-1 md:h-[130px] md:w-auto md:flex-col md:rounded-full  ">
      <div className="transition-colors hover:text-rose-600 sm:px-3 md:px-0">
        <FavoriteIcon
          style={{
            fontSize: '1.2rem',
            fill: '',
          }}
        />
      </div>
      <div className="transition-colors hover:text-rose-600 sm:px-3 md:px-0">
        <RiShareLine style={{ fontSize: '1.2rem' }} />
      </div>
      <div className="transition-all hover:text-rose-600 active:scale-125 sm:px-3 md:px-0">
        <RiShoppingCart2Line
          style={{
            fontSize: '1.2rem',
          }}
        />
      </div>
    </div>
  );
};

export default CardActions;
