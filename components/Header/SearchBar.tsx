/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/style-prop-object */
import React from 'react';
import { GoSearch } from 'react-icons/go';

// import LocationListBox from '../ListBox/LocationListBox';

// import { useLanguage } from '../../hooks/useLanguage';

function SearchBar() {
  return (
    <div className="flex">
      <form>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-gray-300 bg-blue-600 py-2.5  px-4 text-center text-sm font-medium text-white text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            All categories{' '}
            <svg
              aria-hidden="true"
              className="ml-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style={{
              position: 'absolute',
              inset: 'auto auto 0px 0px',
              margin: '0px',
              transform: 'translate3d(897px, 5637px, 0px)',
            }}
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mockups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logos
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>

      <div className="flex w-full max-w-[30rem] flex-grow items-center rounded-lg bg-slate-600/10 px-4 dark:bg-slate-800 md:w-[90%] md:ltr:ml-4 md:rtl:mr-4">
        <GoSearch style={{ color: 'rgb(156 163 175)' }} />
        <input
          className="w-full bg-transparent px-4 py-2 outline-none md:py-3 "
          type="search"
          placeholder="search"
        />
      </div>
    </div>
  );
}

export default SearchBar;
