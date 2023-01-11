/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';

import { NavItems } from './nav-items';
import { SearchBar } from './search-bar';

export function Header() {
  return (
    <div className=" flex w-full items-center justify-between bg-white px-12 py-7">
      <div className="flex items-center gap-16">
        <Link href="/">
          <img src="/images/logo.svg" className="h-14 w-16" />
        </Link>

        <SearchBar />
      </div>
      <NavItems />
    </div>
  );
}
