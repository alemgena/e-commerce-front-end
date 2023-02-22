/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useMemo, useRef, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { FaGreaterThan } from 'react-icons/fa';
import { GoGrabber } from 'react-icons/go';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';

import CategoryData from '../../lib/data/categories.json';
import Theme from '../Header/theme/Theme';

import MenusContainer from './MenuContainer';

type CategoryProps = {
  id: number;
  parent_id: number | null;
  slug: string;
  name: string;
  image: string | null;
  image_v2: string | null;
  position: number;
  childes: CategoryProps[] | [];
};

function MegaMenu() {
  const [categories] = useState(CategoryData.categories);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState([] as CategoryProps[]);
  const [scrollTopValue, setScrollTopValue] = useState(0);
  const [scrollTopValueForSubMenu, setScrollTopValueForSubMenu] = useState(0);

  const memoizedHoveredCategory = useMemo(() => {
    const hoveredCategoryIn = categories.find(
      (category: CategoryProps) => category.id === hoveredCategoryId
    );
    if (hoveredCategoryIn) {
      setHoveredCategory(hoveredCategoryIn?.childes);
    } else {
      setHoveredCategory([]);
    }
  }, [hoveredCategoryId]);

  return (
    <div
      onMouseLeave={(e) => {
        e.stopPropagation();
        setHoveredCategoryId(0);
      }}
      className="relative w-full font-roboto-regular "
    >
      <div
        onScroll={(e) => {
          e.stopPropagation();
          setScrollTopValue(e.currentTarget.scrollTop);
        }}
        className="relative flex max-h-[36vw] flex-col overflow-y-scroll border bg-white shadow-md scrollbar-hide"
      >
        <div
          className={`${
            scrollTopValue > 0
              ? 'visible sticky top-0 z-50 transition-all'
              : 'hidden animate-fadeExit'
          } w-full bg-white opacity-90`}
        >
          <div
            className="flex h-16 items-center justify-center"
            onClick={(e) => {
              setScrollTopValue(0);
              e.currentTarget.parentElement?.parentElement?.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            <RxCaretUp size={30} className="font-light text-main-secondary" />
          </div>
        </div>

        <div className="pb-2" />

        {categories.map((category: CategoryProps) => (
          <div
            id={category.id.toString()}
            key={category.id}
            onMouseEnter={(e) => {
              e.stopPropagation();
              setHoveredCategoryId(category.id);
            }}
            className="mb-2 flex items-center justify-between pl-2 pr-4"
          >
            <div className="flex items-center gap-x-4">
              <div>
                <img
                  src={category.image_v2}
                  alt={category.slug}
                  className="h-10 w-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg text-main-secondary">
                  {category.name}
                </span>
                <span className="text-main-secondary">2,697 ads</span>
              </div>
            </div>
            <div>
              <AiOutlineRight size={14} />
            </div>
          </div>
        ))}
        <div
          className={`${
            scrollTopValue < 382.5 && scrollTopValue >= 0
              ? 'visible sticky bottom-0 z-50 transition-all'
              : 'hidden animate-fadeExit'
          } sticky bottom-0 w-full bg-white opacity-90`}
        >
          <div
            className="flex h-10 items-center justify-center"
            onClick={(e) => {
              setScrollTopValue(382.5);
              e.currentTarget.parentElement?.parentElement?.scrollTo({
                top: 382.5,
                behavior: 'smooth',
              });
            }}
          >
            <RxCaretDown size={24} />
          </div>
        </div>
      </div>

      <div
        onScroll={(e) => {
          e.stopPropagation();
          setScrollTopValueForSubMenu(e.currentTarget.scrollTop);
        }}
        className={`${
          hoveredCategory.length === 0 ? 'hidden' : 'visible'
        } absolute top-0 -right-[400px] z-50 h-[36vw] w-[400px] flex-col overflow-y-scroll bg-white shadow scrollbar-hide`}
      >
        <div
          className={`${
            scrollTopValueForSubMenu > 0
              ? 'visible sticky top-0 z-50 transition-all'
              : 'hidden animate-fadeExit'
          } w-full bg-white opacity-90`}
        >
          <div
            className="flex h-16 items-center justify-center"
            onClick={(e) => {
              setScrollTopValueForSubMenu(0);
              e.currentTarget.parentElement?.parentElement?.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            <RxCaretUp size={30} className="font-light text-main-secondary" />
          </div>
        </div>

        <div className="pb-2" />

        {hoveredCategory.map((category: CategoryProps) => (
          <div
            id={category.id.toString()}
            key={category.id}
            className="mb-2 flex items-center justify-between pl-2 pr-8"
          >
            <div className="flex items-center gap-x-4">
              <div>
                {category.image_v2 ? (
                  <img
                    src={category.image_v2}
                    alt={category.slug}
                    className="h-10 w-10"
                  />
                ) : null}
              </div>
              <div className="flex flex-col">
                <span className="text-base text-main-secondary">
                  {category.name}
                </span>
                <span className="text-sm">2,697 ads</span>
              </div>
            </div>
          </div>
        ))}

        <div
          className={`${
            scrollTopValueForSubMenu < 382.5 &&
            scrollTopValueForSubMenu >= 0 &&
            hoveredCategory.length > 10
              ? 'visible sticky bottom-0 z-50 transition-all'
              : 'hidden animate-fadeExit'
          } sticky bottom-0 w-full bg-white opacity-90`}
        >
          <div
            className="flex h-10 items-center justify-center"
            onClick={(e) => {
              console.log(e.currentTarget.scrollTop);
              setScrollTopValueForSubMenu(382.5);
              e.currentTarget.parentElement?.parentElement?.scrollTo({
                top: 382.5,
                behavior: 'smooth',
              });
            }}
          >
            <RxCaretDown size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
