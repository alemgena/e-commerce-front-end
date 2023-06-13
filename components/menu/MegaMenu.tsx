/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useMemo, useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { RootStateOrAny, useSelector } from 'react-redux';
import { baseURL } from '@/config';
import Link from 'next/link';
import PageSpinner from '../Ui/PageSpinner';
import Norecords from '../Ui/Norecords';
//import Translate  from '@google-cloud/translate'.v2;
import Convert from './Convert';
import axios from 'axios';
import i18next from 'i18next';
import {useTranslation } from 'react-i18next';
interface Category {
  id: number;
  subcategory: SubCategory[];
}

interface SubCategory {
  id: number;
}

type CategoryProps = {
  id: number;
  parent_id: number | null;
  slug: string;
  name: string;
  image: string | null;
  image_v2: string | null;
  position: number;
  imageURL: any;
  subcategory: CategoryProps[] | [];
};
interface Category {
  id: number;
  subcategory: SubCategory[];
}

interface SubCategory {
  id: number;
}

function MegaMenu() {
  const categoriesData = useSelector(
    (state: RootStateOrAny) => state.categories.categories
  );
const{t}=useTranslation()
  const [hoveredCategoryId, setHoveredCategoryId] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState([] as CategoryProps[]);
  const [scrollTopValue, setScrollTopValue] = useState(0);
  const [scrollTopValueForSubMenu, setScrollTopValueForSubMenu] = useState(0);
  const[categories,setCategories]=useState<any>([])
  const { isLoading } = useSelector(
    (state: RootStateOrAny) => state.categories
  );
  const [hasData, setHasData] = useState(false);

  const memoizedHoveredCategory = useMemo(() => {
    if (categoriesData.data) {
      const hoveredCategoryIn = categoriesData.data.find(
        (category: CategoryProps) => category.id === hoveredCategoryId
      );
      if (hoveredCategoryIn) {
        setHoveredCategory(hoveredCategoryIn?.subcategory);
      } else {
        setHoveredCategory([]);
      }
    }
  }, [hoveredCategoryId, categoriesData.data]);
  useEffect(() => {
    if (categoriesData.data) {
      if (!categoriesData.data.length) setHasData(true);
      const selectedObjects = categoriesData?.data?.filter(
        (item: any) =>
          item.name === 'Fashion' ||
          item.name === 'mobile_phones'||
          item.name==='Electronics'||
          item.name==='Seeking Work CV'
      );
      const indexToPlace = 0; // After the first index
const mutableArray = [...categoriesData.data];
      if (selectedObjects.length > 0) {
        selectedObjects.forEach((selectedObject: any) => {
          const index = mutableArray.indexOf(selectedObject);
          if (index > -1) {
            mutableArray.splice(index, 1); // Remove the selected object from its current index
          }
        });
        mutableArray.splice(indexToPlace + 1, 0, ...selectedObjects); // Place the selected objects after the first index
      }
      const cherryObject = mutableArray.find((obj) => obj.name === 'Property');
      if (cherryObject) {
        const cherryIndex = mutableArray.findIndex((obj) => obj.name === 'Property');
        mutableArray.splice(cherryIndex, 1);
        mutableArray.splice(0, 0, cherryObject);
      }
         const mobileObject = mutableArray.find(
           (obj) => obj.name === 'mobile_phones'
         );
      if (mobileObject) {
        const mobileIndex = mutableArray.findIndex(
          (obj) => obj.name === 'mobile_phones'
        );
        mutableArray.splice(mobileIndex, 1);
        mutableArray.splice(3, 0, mobileObject);
      }
    setCategories(mutableArray)
    }

  }, [categoriesData]);

  const [categoryCounts, setCategoryCounts] = useState<Record<number, number>>(
    {}
  );
  const [subcategoryCounts, setSubcategoryCounts] = useState<Record<any, any>>(
    {}
  );

  useEffect(() => {
    categoriesData?.data?.forEach((category: Category) => {
      category?.subcategory?.forEach((subcategory: SubCategory) => {
        axios
          .get(`https://api.liyumarket.com/api/subcategories/${subcategory.id}`)
          .then((response) => {
            // Update product count for this subcategory
            setSubcategoryCounts((prevSubcategoryCounts) => ({
              ...prevSubcategoryCounts,
              [subcategory.id]: response?.data?.data?.product?.length,
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }, [categoriesData?.data]);

  useMemo(() => {
    const newCategoryCounts: Record<number, number> = {};
    categoriesData?.data?.forEach((category: Category) => {
      let totalSubcategoryCount = 0;
      category.subcategory.forEach((sub: any) => {
        totalSubcategoryCount += subcategoryCounts[sub.id] || 0;
      });
      newCategoryCounts[category.id] = totalSubcategoryCount;
    });
    setCategoryCounts(newCategoryCounts);
  }, [subcategoryCounts]);
  return (
    <div>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <>
          {categoriesData.data && (
            <div
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredCategoryId(0);
              }}
              className="relative w-full font-sans hover:cursor-pointer"
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
                      ? 'visible sticky top-0  transition-all'
                      : 'animate-fadeExit hidden'
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
                    <RxCaretUp
                      size={30}
                      className="text-main-secondary font-light"
                    />
                  </div>
                </div>

                <div className="pb-2" />

                {categories.map((category: CategoryProps) => {
                  const categoryCount = categoryCounts[category.id];

                  return (
                    <>
                      {category.subcategory.length ? (
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
                                src={`${baseURL}/${category.imageURL}`}
                                alt={category.name}
                                className="h-10 w-10"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-main-secondary text-lg">
                              <Convert text={category.name} language={i18next.language}/>
                              </span>
                              <span className="text-main-secondary text-xs">
                                {categoryCount} {t("products")}
                              </span>
                            </div>
                          </div>
                          <div>
                            <AiOutlineRight size={14} />
                          </div>
                        </div>
                      ) : null}
                    </>
                  );
                })}
                <span>{hasData && <Norecords />}</span>
                <div
                  className={`${
                    scrollTopValue < 382.5 && scrollTopValue >= 0
                      ? 'visible sticky bottom-0 transition-all'
                      : ''
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
                } absolute -right-[400px] top-0  h-[36vw] w-[400px] flex-col overflow-y-scroll bg-white shadow scrollbar-hide`}
              >
                <div
                  className={`${
                    scrollTopValueForSubMenu > 0
                      ? 'visible sticky top-0  transition-all'
                      : 'animate-fadeExit hidden'
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
                    <RxCaretUp
                      size={30}
                      className="text-main-secondary font-light"
                    />
                  </div>
                </div>
                <div className="pb-2" />

                {hoveredCategory.map((category: CategoryProps) => {
                  const subcategoryCount = subcategoryCounts[category.id];
                  return (
                    <div
                      id={category.id.toString()}
                      key={category.id}
                      className="mb-2 flex items-center justify-between pl-2 pr-8"
                    >
                      <Link
                        href={{
                          pathname: '/category',
                          query: { name: category.name },
                        }}
                      >
                        <div className="flex items-center gap-x-4">
                          <div>
                            {category.imageURL.length ? (
                              <img
                                src={`${baseURL}/${category.imageURL[0]}`}
                                alt={category.name}
                                loading="lazy"
                                className="h-10 w-10"
                              />
                            ) : null}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-main-secondary cursor-pointer text-base">
                              <Convert
                                text={category.name}
                                language={i18next.language}
                              />
                            </span>
                            <span className="text-sm">
                              {subcategoryCount} {t("products")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}

                <div
                  className={`${
                    scrollTopValueForSubMenu < 382.5 &&
                    scrollTopValueForSubMenu >= 0 &&
                    hoveredCategory.length > 10
                      ? 'visible sticky bottom-0  transition-all'
                      : 'animate-fadeExit hidden'
                  } sticky bottom-0 w-full bg-white opacity-90`}
                >
                  <div
                    className="flex h-10 items-center justify-center"
                    onClick={(e) => {
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
          )}
        </>
      )}
    </div>
  );
}

export default MegaMenu;
