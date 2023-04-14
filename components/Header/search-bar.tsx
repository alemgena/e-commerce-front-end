/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import axios from 'axios';
import React from 'react'
import { Fragment, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { Listbox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { baseURL } from '@/config';
const cities = [
  { name: 'Addis Ababa' },
  { name: 'Afar' },
  { name: 'Amhara' },
  { name: 'Benishangul-Gumuz' },
  { name: 'Dire Dawa' },
  { name: 'Gambela' },
  { name: '	Harari' },
  { name: 'Harari' },
  { name: 'Somali' },
  { name: 'Oromia' },
  { name: 'Tigray' },
  { name: 'SNNPR' },
  { name: 'Sidama' },
  { name: 'SWEPR' },
];

export function SearchBar() {
    const [regions, setRegions] = useState<any>([]);
    React.useEffect(() => {
      async function fetcRegions() {
        try {
          const { data } = await axios.get(`${baseURL}api/regions/`);
          if (data) {
            setRegions(data.data);
          }
        } catch (error: any) {}
      }
      fetcRegions();
    }, []);
  const router = useRouter();
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(cities[0]);
  const handleLogout = (event: any) => {
    router.push(`/product/${event}`);
  };
  const handleLSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (q) router.push(`/search/${q}`);
  };

  return (
    <div className="font-roboto-regular hidden lg:flex">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="font-roboto-light flex  w-40 justify-between gap-2 rounded-l-lg bg-blue-800 py-3 px-3 text-sm text-white  ">
            <span className="">{selected.name}</span>
            <MdOutlineArrowDropDown className="h-5 w-5  text-white" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1  w-full  rounded-md bg-white py-1  text-sm shadow-lg">
              {regions.map((city, cityIdx) => (
                <Listbox.Option
                  key={cityIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? ' text-blue-800' : 'text-gray-900'
                    }`
                  }
                  value={city}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate  ${
                          selected ? 'font-roboto-medium text-blue-800' : ''
                        }`}
                        onClick={() => handleLogout(city.name)}
                      >
                        {city.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-800">
                          <AiOutlineCheck className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <form onSubmit={(e) => handleLSearch(e)}>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          type="text"
          placeholder="Search items"
          className=" h-11 w-80 rounded-r-lg border px-3 py-2 text-sm placeholder-gray-700 focus:outline-none"
        />
      </form>
    </div>
  );
}
