import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface IBreadcrumb {
  breadcrumb: string;
  href: string;
}
type ImainCategory = {
  mainCategory?: string;
};

function Breadcrumb({ mainCategory }: ImainCategory) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[] | []>([]);
  useEffect(() => {
    if (router) {
      const paths = router.asPath.split('/');
      paths.shift();

      const pathsArray = paths.map((path, i) => ({
        breadcrumb: path.replace('category?name=', '/'),
        href: `/${paths.slice(0, i + 1).join('/')}`,
      }));

      setBreadcrumbs(pathsArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <div className="text-palette-mute md:my-none mb-3 mt-4 flex overflow-auto whitespace-nowrap text-[11px] dark:text-slate-300 sm:text-sm md:-mt-4">
      <nav className="flex px-2 py-7 leading-6 sm:px-5">
        <ul className="flex items-center space-x-1 md:space-x-2">
          <li className="cursor-pointer">
            <Link href="/">
              <a className="flex ltr:pr-1 rtl:pl-2">
                <span className="text-xl ltr:ml-0 rtl:mr-0 ">Home</span>
              </a>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb) => (
            <li className="flex  items-center" key={breadcrumb.href}>
              <span>
                {' '}
                <HiChevronRight />
              </span>
              <Link href={breadcrumb.href}>
                <a className="font-semi-bold inline-block px-0 text-xl">
                  <span>
                    {`${mainCategory} ${decodeURIComponent(
                      breadcrumb.breadcrumb.replace(/\+\+/g, ' ')
                    )}`}
                  </span>
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
