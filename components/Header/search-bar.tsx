/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import { Fragment, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { Listbox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
const cities = [
 {name:'Addis Ababa'},
  {name:'Afar'},
  {name:'Amhara'},
  {name:'Benishangul-Gumuz'},
  {name:'Dire Dawa'},
  {name:'Gambela'},
  {name:'	Harari'},
  {name:'Harari'},
  {name:'Somali'},
  {name:'Oromia'},
  {name:'Tigray'},
  {name:'SNNPR'},
  {name:'Sidama'},
  {name:'SWEPR'},
];

export function SearchBar() {
  const router = useRouter();
  const [selected, setSelected] = useState(cities[0]);
  const handleLogout = (event: any) => {
router.push(`/product/${event}`);
  
};

  return (
    <div className="z-[100] flex font-roboto-regular">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="flex w-40  justify-between gap-2 rounded-l-lg bg-blue-800 py-3 px-3 font-roboto-light text-sm text-white  ">
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
              {cities.map((city, cityIdx) => (
            
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
                          selected
                            ? 'font-roboto-medium text-blue-800'
                            : ''
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
      <input
        type="text"
        placeholder="Search items"
        className="w-80 rounded-r-lg bg-gray-300 px-3 py-2 text-sm placeholder-gray-700 focus:outline-none"
      />
    </div>
  );
}
