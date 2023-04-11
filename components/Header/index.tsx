/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import { NavItems } from './nav-items';
import { SearchBar } from './search-bar';
export function Header() {
  return (
    <div className="z-100  fixed sticky left-0 right-0 top-0 top-0 z-50 w-full bg-white bg-white shadow-lg">
      <div className="container m-auto flex w-full items-center justify-between bg-white py-2">
        <Link href="/">
          <img
            src="/images/logo.svg"
            className="h-14 w-16 cursor-pointer lg:ml-4"
          />
        </Link>

        <SearchBar />
        <NavItems />
      </div>
    </div>
  );
}
