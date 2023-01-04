/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import MenuItems from '@/components/menuItems';
import { IDropDown } from '@/lib/types/dropDown';
import menuItems from '@/mock/menuItems';
import { activeMenuItemActions } from '@/store/activeMenuItem-slice';
import { BsXLg } from 'react-icons/bs';
import SubMenu from './subMenu';

function MenusContainer({ closeMenuMegaHandler }) {
  const [subMenuItems, setSubMenuItems] = useState<IDropDown[]>();
  const dispatch = useDispatch();
  function activeItem(
    submenuList: IDropDown[] | undefined,
    activeItemIndex: number,
    activeItemName: string
  ) {
    setSubMenuItems(submenuList);
    dispatch(activeMenuItemActions.setActiveMenuItemIndex(activeItemIndex));
    dispatch(activeMenuItemActions.setActiveMenuItemText(activeItemName));
  }

  useEffect(() => {
    setSubMenuItems(menuItems[0].productsGroup);
    return () => {
      dispatch(activeMenuItemActions.setActiveMenuItemIndex(0));
      dispatch(activeMenuItemActions.setActiveMenuItemText('digital'));
    };
  }, []);

  return (
    <div className=" flex  ">
      <nav className="w-96  border-slate-300 ltr:border-r-2 rtl:border-l-2 md:py-4">
        <div className="flex flex-row items-center justify-between px-6">
          <h2 className="font-roboto-bold text-lg">Choose</h2>
          <BsXLg
            className="hover:text-gray-400"
            onClick={closeMenuMegaHandler}
          />
        </div>
        <MenuItems onMouseOver={activeItem} />
      </nav>
      <SubMenu mainTitle={menuItems[0].category} subMenuItems={subMenuItems} />
    </div>
  );
}

export default MenusContainer;
