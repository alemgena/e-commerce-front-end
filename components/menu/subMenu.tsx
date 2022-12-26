/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';

export interface IDropDown {
  title: string;
  url?: string;
  subtitles: string[];
}

interface Props {
  subMenuItems: IDropDown[] | undefined;
}
export interface IActiveMenuItem {
  activeMenuItemIndex: number;
  activeMenuItemText: string;
}

export interface IActiveMenuItemRootState {
  activeMenuItem: IActiveMenuItem;
}

// eslint-disable-next-line no-unused-vars
const SubMenu: React.FC<Props> = ({ subMenuItems }) => {
  const ArrowDirection = HiChevronRight;

  const activeMenuItemText = '';

  return (
    <div className="flex w-full flex-col px-6 py-5">
      <div className="transition-color hover:text-palette-primary flex items-center duration-300">
        <Link href={`/${activeMenuItemText}`}>
          <a className="lrt:mr-4 block text-[16px] rtl:ml-4 ">seeAllProduct</a>
        </Link>
        <ArrowDirection style={{ fontSize: '1rem', color: 'inherit' }} />
      </div>
      <br />
      <div className="relative grow md:columns-[188px] xl:max-w-4xl xl:columns-3    ">
        <div className="py-3">
          <Link href="/products">
            <a className="transition-color border-palette-primary hover:text-palette-primary block rounded-sm px-2 text-sm font-bold duration-300 ltr:mr-10 ltr:border-l-4 rtl:ml-10 rtl:border-r-4">
              Digital
            </a>
          </Link>

          <Link href="#">
            <a className="transition-color hover:text-palette-primary block py-2 duration-200">
              dsfkjsdkfjskd
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
