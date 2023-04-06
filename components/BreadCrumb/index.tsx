import React, { useEffect, useState } from 'react';
import { BsShop } from 'react-icons/bs';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface IBreadcrumb {
  breadcrumb: string;
  href: string;
}

function Breadcrumb() {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[] | []>([]);
  useEffect(() => {
    if (router) {
      const paths = router.asPath.split('/');
      paths.shift();

      const pathsArray = paths.map((path, i) => ({
        breadcrumb: path.replace('?name=',"/"),
        href: `/${paths.slice(0, i + 1).join('/')}`,
      }));

      setBreadcrumbs(pathsArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <div className="text-palette-mute md:my-none mt-4 mb-3 flex overflow-auto whitespace-nowrap text-[11px] dark:text-slate-300 sm:text-sm md:-mt-4">
      <nav className="flex py-7 px-2 leading-6 sm:px-5">
        <ul className="flex items-center space-x-1 md:space-x-2">
          <li className="cursor-pointer">
            <Link href="/">
              <a className="flex ltr:pr-1 rtl:pl-2">
                <span className="text-lg ltr:ml-0 rtl:mr-0">Home</span>
              </a>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, i) => (
            <li className="flex  items-center" key={breadcrumb.href}>
              <span>
                {' '}
                <HiChevronRight />
              </span>
              <Link href={breadcrumb.href}>
                <a className="inline-block px-0 font-roboto-medium">
                  {breadcrumb.breadcrumb}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Breadcrumb;
