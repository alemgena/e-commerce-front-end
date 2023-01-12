/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import Breadcrumb from '@/components/BreadCrumb';
import Carousel from '@/components/carousel';
import CategroySection from '@/components/CategorySection';
import CategoryShop from '@/components/CategorySection/CategoryShop';
import Featured from '@/components/featured/FeaturedProducts';
import FeaturedShop from '@/components/featured/featuredShop';
import Menu from '@/components/menu';
import NewArrival from '@/components/newArrival';
import NewsLetterSubscription from '@/components/NewsLetterSubscription';

export default function Index() {
  return (
    <>
      <Menu />
      <Carousel />
      <CategroySection />
      <Featured />
      <FeaturedShop />
      <CategoryShop />
      <NewArrival />
      <NewsLetterSubscription />
    </>
  );
}
