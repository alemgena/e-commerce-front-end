/* eslint-disable @typescript-eslint/no-unused-vars */

import Carousel from '@/components/carousel';
import CategroySection from '@/components/CategorySection';
import Featured from '@/components/featured/FeaturedProducts';
import FeaturedShop from '@/components/featured/featuredShop';
import Menu from '@/components/menu';
import NewArrival from '@/components/newArrival';

export default function Index() {
  return (
    <>
      <Menu />
      <Carousel />
      <CategroySection />
      <Featured />
      <FeaturedShop />
      <NewArrival />
    </>
  );
}
