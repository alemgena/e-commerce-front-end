/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import { NavItems } from './nav-items';
import { SearchBar } from './search-bar';
export function Header() {
  return (
    <div className="sticky top-0 z-0 w-full bg-white shadow-lg">
      <div className="container m-auto flex w-full items-center justify-between bg-white py-2">
        <Link href="/">
          <img src="/images/logo.svg" className="h-14 w-16 cursor-pointer lg:ml-4" />
        </Link>

        <SearchBar />
        <NavItems />
      </div>
    </div>
  );
}
