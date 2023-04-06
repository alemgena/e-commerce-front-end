/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import MenuItems from '@/components/menuItems';
import { IDropDown } from '@/lib/types/dropDown';
import menuItems from '@/mock/menuItems';
import { activeMenuItemActions } from '@/store/activeMenuItem-slice';
import { BsXLg } from 'react-icons/bs';
import SubMenu from './subMenu';

function MenusContainer({  }) {
  const [subMenuItems, setSubMenuItems] = useState<IDropDown[]>();
  const[mainTitle,setMainTitle]=useState<string>()
  const dispatch = useDispatch();
    const activeMenuItemIndex = useSelector(
      (state: RootStateOrAny) =>
        state.activeMenuItem.activeMenuItemIndex
    );
  function activeItem(
    submenuList: IDropDown[] | undefined,
    activeItemIndex: number,
    activeItemName: string
  ) {
    console.log(subMenuItems)
    setSubMenuItems(submenuList);
    setMainTitle(activeItemName)
    console.log(activeItemIndex)
    dispatch(activeMenuItemActions.setActiveMenuItemIndex(activeItemIndex));
    dispatch(activeMenuItemActions.setActiveMenuItemText(activeItemName));
  }

  useEffect(() => {
   // setSubMenuItems(menuItems[0].productsGroup);
    return () => {
      dispatch(activeMenuItemActions.setActiveMenuItemIndex(-1));
      dispatch(activeMenuItemActions.setActiveMenuItemText(''));
    };
  }, []);
  const handleOnMouseLeave = () => {
    dispatch(activeMenuItemActions.setActiveMenuItemIndex(-1));
    dispatch(activeMenuItemActions.setActiveMenuItemText(''));
  };
  return (
    <div className=" flex " onMouseLeave={handleOnMouseLeave}>
      <nav className=" border-r-1 mr-0  md:py-4">
        <MenuItems onMouseOver={activeItem} />
      </nav>
      {activeMenuItemIndex == -1 ? (
        <></>
      ) : (
        <SubMenu
          mainTitle={menuItems[0].category}
          subMenuItems={subMenuItems}
        />
      )}
    </div>
  );
}

export default MenusContainer;
