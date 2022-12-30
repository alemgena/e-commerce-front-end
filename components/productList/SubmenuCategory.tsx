/* eslint-disable no-unreachable */
import React from 'react';
import { useRouter } from 'next/router';

import { useWindowDimensions } from '../../hooks/useWindowDimensions';

function SubmenuCategory() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const iconFontSize = width <= 768 ? '1.5rem' : '2.5rem';
  const { category } = router.query;

  function onClickHandler(name: string) {
    router.push('/Clothing/T-shirt');
  }

  return;
  <div className="mb-6 flex flex-col md:items-center">
    <h3 className="mb-3 text-center md:mb-6 md:text-2xl">categories</h3>
    <div className="flex flex-wrap justify-center">
      <div
        className="bg-palette-card mx-1 my-1 flex w-[5rem] flex-grow cursor-pointer flex-col items-center rounded-lg py-2 px-2 shadow-lg sm:w-auto sm:px-3 md:mx-3 md:py-4 md:px-6"
        onClick={() => onClickHandler('T-shirt')}
      >
        <h4 className="text-center text-[12px] md:pt-3 md:text-base">
          T-shirt
        </h4>
      </div>
    </div>
  </div>;
}

export default SubmenuCategory;
