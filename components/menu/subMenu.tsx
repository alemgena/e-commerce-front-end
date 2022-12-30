/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { IActiveMenuItemRootState } from '@/lib/types/activeMenuItem';
import { IDropDown } from '@/lib/types/dropDown';
import { megaMenuActions } from '@/store/megaMenu-slice';

interface Props {
  subMenuItems: IDropDown[] | undefined;
  mainTitle: string;
}
const SubMenu: React.FC<Props> = ({ subMenuItems, mainTitle }) => {
  const ArrowDirection = HiChevronRight;
  const dispatch = useDispatch();
  const activeMenuItemText = useSelector(
    (state: IActiveMenuItemRootState) => state.activeMenuItem.activeMenuItemText
  );

  return (
    <div
      className="flex w-full flex-col bg-gray-300 px-6 py-5"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="hover:text-palette-primary transition-color flex items-center duration-300">
        {subMenuItems ? (
          <Link href={`/${activeMenuItemText}`}>
            <a
              className="lrt:mr-4 block font-roboto-bold text-lg text-[16px] rtl:ml-4 "
              onClick={() => dispatch(megaMenuActions.closeMegaMenu())}
            >
              {mainTitle}
            </a>
          </Link>
        ) : null}
      </div>
      <br />
      <div className="relative flex flex-col md:columns-[188px] xl:max-w-4xl   ">
        {subMenuItems && activeMenuItemText ? (
          <>
            {subMenuItems.map((menuTitle, index) => (
              <div
                className="justif-center flex flex-row py-3"
                key={`${menuTitle}-${index}`}
              >
                <img
                  src={`/images/${menuTitle.subImg}`}
                  className="h-10  rounded-full object-cover"
                />
                <Link href={`/${activeMenuItemText}/${menuTitle.title}`}>
                  <a
                    className="border-palette-primary hover:text-palette-primary transition-color  rounded-sm px-2 text-sm font-bold duration-300 ltr:mb-1 ltr:border-l-4 rtl:mt-1 rtl:border-b-4"
                    onClick={() => dispatch(megaMenuActions.closeMegaMenu())}
                  >
                    {`${menuTitle.title}`}
                  </a>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <p className="text-palette-mute absolute top-[45%] text-sm ltr:left-[30%] rtl:right-[30%]">
            noProduct
          </p>
        )}
      </div>
    </div>
  );
};

export default SubMenu;
