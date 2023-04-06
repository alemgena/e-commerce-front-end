import React from 'react';
import Carousel from '../carousel';
import CategoryShop from '../CategorySection/CategoryShop';
import Featured from '../featured/FeaturedProducts';
import FeaturedShop from '../featured/featuredShop';
import CategroySection from '../CategorySection/index';
import SideBarMenu from '../sideBarMenu';

import MegaMenu from './MegaMenu';

const index = () => (
  <div className="mr-6 sm:ml-0 sm:w-full sm:flex-col md:flex  md:flex-row md:items-start md:justify-between  md:overflow-hidden">
    <div className=" sm:hidden md:mr-10 md:ml-40 md:flex ">
      <MegaMenu />
    </div>
    <div className="top-0  flex-grow sm:w-full md:hidden lg:hidden">
      <Carousel title={'Trending Products'} />
      <CategroySection />
    </div>

    <div className=" hidden sm:ml-1 md:ml-80 md:mt-6 md:flex md:w-full md:flex-col md:items-center  md:justify-center  ">
      <Carousel />
      <div className="w-full">
        <Featured />
      </div>
    </div>
  </div>
);
export default index;
