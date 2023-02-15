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
import { Ur2 } from '@/utils/url';
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
      className="  flex  flex-col bg-gray-300 py-5 pr-60"
      // style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="hover:text-palette-primary transition-color flex items-center duration-300">
      </div>
      <br />
      <div className="relative flex flex-col pl-3 md:columns-[188px] xl:max-w-4xl  ">
        {subMenuItems && activeMenuItemText ? (
          <>
            {subMenuItems.map((menuTitle: any, index) => (
              <div
                className="ml-3 flex flex-row justify-center  py-3"
                key={`${menuTitle}-${index}`}
              >
                <img
                  src={`${Ur2}/${menuTitle.imageURL[0]}`}
                  className="mr-5  h-10 rounded-full object-cover"
                />
                <Link
                  href={{
                    pathname: '/products',
                    query: { name: menuTitle.name },
                  }}
                >
                  <div className="flex w-full flex-col">
                    <a
                      className=" w-fullpx-2  mb-1 text-sm font-bold "
                      onClick={() => dispatch(megaMenuActions.closeMegaMenu())}
                    >
                      {`${menuTitle.name}`}
                    </a>
                    <span className=" flex flex-row justify-center">
                      {' '}
                      23444 <span className="ml-2"> Ads</span>
                    </span>
                  </div>
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
