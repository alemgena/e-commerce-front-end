import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { AiOutlineCheck } from 'react-icons/ai';

interface IOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  options: IOption[];
  placeholder?: string;
}

export const SelectInput: React.FC<SelectInputProps> = (props) => {
  const { options, placeholder = 'Select' } = props;
  const [selected, setSelected] = useState<IOption | null>(null);

  return (
    <Listbox
      value={selected}
      onChange={setSelected}
      as="div"
      className="relative w-full"
    >
      <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-gray-100 p-3 py-4">
        <p className="font-roboto-regular text-sm text-gray-700">
          {selected ? selected.label : placeholder}
        </p>
        <HiChevronDown size={20} />
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? ' text-blue-800' : 'text-gray-900'
                }`
              }
              value={option}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate  ${
                      selected
                        ? 'font-roboto-medium text-blue-800'
                        : 'font-roboto-regular'
                    }`}
                  >
                    {option.label}
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
    </Listbox>
  );
};
