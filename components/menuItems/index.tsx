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
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { IActiveMenuItemRootState } from '@/lib/types/activeMenuItem';
import { IDropDown } from '@/lib/types/dropDown';
import menuItems from '@/mock/menuItems';
import { megaMenuActions } from '@/store/megaMenu-slice';

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
  return (
    <ul className="rounded-lg">
      {menuItems.map((item, index) => (
        <li
          className="transition-color hover:text-palette-primary py-3 font-bold duration-300 md:py-3"
          key={item.category}
        >
          {width <= 768 ? (
            <div
              className={`mt-3 flex cursor-pointer items-center  px-5 text-sm ${
                index === activeMenuItemIndex ? 'md:text-palette-primary' : ''
              }`}
              onClick={() =>
                onMenuItemClickHandler(item.productsGroup, item.category, index)
              }
              onMouseOver={() =>
                props.onMouseOver?.(item.productsGroup, index, item.category)
              }
            >
              {/* <item.icon className="h-6 w-6 " /> */}
              <div
                className={`mx-4 grow ${
                  !item.productsGroup ? 'font-normal text-gray-400' : ''
                }`}
              >
                {item.category}
              </div>
              {item.productsGroup ? (
                <ArrowDirection style={{ fontSize: '1rem' }} />
              ) : null}
            </div>
          ) : (
            <Link href={`/products/category/${item.category}`}>
              <a
                className={`mt-3 flex cursor-pointer items-center  px-5 text-sm ${
                  index === activeMenuItemIndex ? 'md:text-palette-primary' : ''
                }`}
                onClick={() =>
                  onMenuItemClickHandler(
                    item.productsGroup,
                    item.category,
                    index
                  )
                }
                onMouseOver={() =>
                  props.onMouseOver?.(item.productsGroup, index, item.category)
                }
              >
                {/* <item.icon className="h-6 w-6 " /> */}
                <img
                  src={`/images/${item.categoryImg}`}
                  className="h-10  rounded-full object-cover"
                />
                <div
                  className={`mx-4 grow px-1 ${
                    !item.productsGroup ? 'font-normal text-gray-400' : ''
                  }`}
                >
                  {item.category}
                </div>
                {item.productsGroup ? (
                  <ArrowDirection style={{ fontSize: '1rem' }} />
                ) : null}
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
