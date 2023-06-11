/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { NavItems } from './nav-items';
import { SearchBar } from './search-bar';
import { useMediaQuery } from 'react-responsive';
export function Header() {
    const md2 = useMediaQuery({ query: '(min-width: 1025px)' });
  const[largeDevice,setLargeDevice]=useState<boolean>(false)
    useEffect(() => {
      if(md2)setLargeDevice(true)
    },[])
  return (
    <div className="z-100  fixed sticky left-0 right-0 top-0 top-0 z-50 w-full bg-white bg-white shadow-lg">
      <div className="container m-auto flex w-full items-center justify-between bg-white py-2">
        {largeDevice ? (
          <div className="flex">
            <Link href="/">
              <img
                src="/images/logo.svg"
                className="h-14 w-16 cursor-pointer lg:ml-4"
              />
            </Link>
            <span className="ml-4 mt-3">
              <div
                className="font-bold"
                style={{ color: '#000000', fontSize: '15px' }}
              >
                Liymarkiet
              </div>
              <div
                className="font-bold"
                style={{ color: '#000000', fontSize: '15px' }}
              >
                ልዩ ማርኬት
              </div>
            </span>
          </div>
        ) : (
          <Link href="/">
            <img
              src="/images/logo.svg"
              className="h-14 w-16 cursor-pointer lg:ml-4"
            />
          </Link>
        )}

        <SearchBar />
        <NavItems />
      </div>
    </div>
  );
}
