/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { IActiveMenuItemRootState } from '@/lib/types/activeMenuItem';
import { IDropDown } from '@/lib/types/dropDown';
import menuItems from '@/mock/menuItems';
import { megaMenuActions } from '@/store/megaMenu-slice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Ur2 } from '@/utils/url';
interface Props {
  onClick?: (
    submenu: IDropDown[] | undefined,
    activeItemName: string,
    index: number
  ) => void;
  onMouseOver?: (
    submenu: IDropDown[] | undefined,
    index: number,
    activeItemName: string
  ) => void;
}

const MenuItems: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const ArrowDirection = HiChevronRight;

  function onMenuItemClickHandler(
    productsGroup: IDropDown[] | undefined,
    category: string,
    index: number
  ) {
    props.onClick && props.onClick(productsGroup, category, index);
    width >= 768 && dispatch(megaMenuActions.closeMegaMenu());
  }

  const activeMenuItemIndex = useSelector(
    (state: IActiveMenuItemRootState) =>
      state.activeMenuItem.activeMenuItemIndex
  );
  console.log(width)
   const categories = useSelector(
     (state: RootStateOrAny) => state.categories.categories
   );
  return (
    <ul className="rounded-lg">
      {categories.data&&
      <>
      {categories.data.map((item: any, index: number) => (
        <li
          className="transition-color hover:text-palette-primary py-3 font-bold duration-300 md:py-3"
          key={item.name}
        >
          {width <= 768 ? (
            <div
              className={`mt-3 flex cursor-pointer items-center  px-5 text-sm ${
                index === activeMenuItemIndex ? 'md:text-palette-primary' : ''
              }`}
              onClick={() =>
                onMenuItemClickHandler(item.subcategory, item.name, index)
              }
              onMouseOver={() =>
                props.onMouseOver?.(item.subcategory, index, item.name)
              }
            >
              {/* <item.icon className="h-6 w-6 " /> */}
              <div
                className={`mx-4 grow ${
                  !item.subcategory ? 'font-normal text-gray-400' : ''
                }`}
              >
                {item.name}
              </div>
              {item.subcategory.length ? (
                <ArrowDirection style={{ fontSize: '1rem' }} />
              ) : null}
            </div>
          ) : (
            <Link href={`/category/${item.name}`}>
              <a
                className={`mt-3 flex cursor-pointer items-center  px-5 text-sm ${
                  index === activeMenuItemIndex ? 'md:text-palette-primary' : ''
                }`}
                onClick={() =>
                  onMenuItemClickHandler(item.subcategory, item.name, index)
                }
                onMouseOver={() =>
                  props.onMouseOver?.(item.subcategory, index, item.name)
                }
              >
                {/* <item.icon className="h-6 w-6 " /> */}
                <img
                  src={`${Ur2}/${item.imageURL}`}
                  className="h-10  rounded-full object-cover"
                />
                <div
                  className={`mr-4 ml-5 grow px-1 ${
                    !item.productsGroup ? 'font-normal text-gray-400' : ''
                  }`}
                >
                  <span className="w-full overflow-hidden font-normal leading-4">
                    {item.name}
                  </span>
                  <div className="flex flex-row justify-center">
                    <span className="text-black-100 flex min-h-fit w-full  font-roboto-light font-thin">
                      {' '}
                      232 <span className="pl-1 "> Ads</span>
                    </span>
                  </div>
                </div>
                {item.subcategory.length ? (
                  <ArrowDirection
                    style={{ marginLeft: 100, fontSize: '3rem' }}
                  />
                ) : null}
              </a>
            </Link>
          )}
        </li>
      ))}
</>
      }
    </ul>
  );
};

export default MenuItems;
