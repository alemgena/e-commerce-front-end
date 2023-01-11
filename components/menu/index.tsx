import React from 'react';

import SideBarMenu from '../sideBarMenu';

import MegaMenu from './MegaMenu';

const index = () => (
  <div className="mt-30  hidden items-center md:flex">
    <SideBarMenu />
    <MegaMenu />
  </div>
);
export default index;
