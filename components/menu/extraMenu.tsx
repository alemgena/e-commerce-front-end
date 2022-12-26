import React from 'react';
import Link from 'next/link';

function ExtraMenu() {
  return (
    <div className="flex grow items-center border-gray-300 ltr:ml-2 ltr:border-l-2 rtl:mx-5 rtl:border-r-2">
      <div className="text-base/90 mx-2 flex items-center">
        <Link href="/featured">
          <a>Featured Products</a>
        </Link>
        <Link href="/featured">
          <a>Featured Products</a>
        </Link>
        <Link href="/featured">
          <a>Featured Products</a>
        </Link>
        <Link href="/featured">
          <a>Featured Products</a>
        </Link>
      </div>
    </div>
  );
}

export default ExtraMenu;
