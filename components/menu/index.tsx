import React from 'react';

import SideBarMenu from '../sideBarMenu';

import MegaMenu from './MegaMenu';

const index = () => (
  <div className="md:bg-palette-fill mt-30 left-7 right-40 top-20  z-[1000] mb-10 hidden flex-grow items-center pt-4  shadow-sm md:fixed md:flex">
    <SideBarMenu />
    <MegaMenu />
  </div>
);
export default index;
