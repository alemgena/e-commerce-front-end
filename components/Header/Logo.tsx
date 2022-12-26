import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <a className="block w-full flex-grow items-center justify-center md:flex md:flex-grow-0">
        <Image
          src="/images/Group 77298.svg"
          alt="zishop-logo"
          width={120}
          height={25}
          objectFit="contain"
          className="cursor-pointer md:ltr:-mr-3"
        />
      </a>
    </Link>
  );
}

export default Logo;
