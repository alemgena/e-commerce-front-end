/* eslint-disable react/jsx-no-bind */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import SubMenu from './subMenu';

export interface IDropDown {
  title: string;
  url?: string;
  subtitles: string[];
}

function MenusContainer() {
  //   const [subMenuItems, setSubMenuItems] = useState<IDropDown[]>();

  //   function activeItem(
  //     submenuList: IDropDown[] | undefined,
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     activeItemIndex: number,
  //     activeItemName: string
  //   ) {
  //     setSubMenuItems(submenuList);
  //   }
  return (
    <div className=" flex">
      <nav className="border-slate-300 ltr:border-r-2 rtl:border-l-2 md:w-80 md:py-4">
        {/* <MenuItems  /> */}
      </nav>
      <SubMenu subMenuItems={[]} />
    </div>
  );
}

export default MenusContainer;
