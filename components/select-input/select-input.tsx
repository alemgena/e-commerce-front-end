import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { AiOutlineCheck } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
interface IOption {
  label: string;
  name: string;
  subcategory: string;
  found:undefined
}

interface SelectInputProps {
  options: IOption[];
  value: IOption | undefined;
  placeholder?: string;
  setValue: any;
  type: string;
  setSubCategoryData: any | undefined;
  setProductOptions: any;
 
}

export const SelectInput: React.FC<SelectInputProps> = (props) => {
  const {
    setValue,
    value,
    type,
    setSubCategoryData,
    options,
    setProductOptions,
    placeholder = 'Select',
  } = props;
  const [selected, setSelected] = useState<IOption | null|undefined>(null);
  const handleClick = (option:any) => {
    if (type === 'category') {
      var found:any = options.find(function (element: any) {
        return element.name == option.name;
      });
      setSubCategoryData(found.subcategory);
    } else if (type === 'subcategory') {
      var found:any = options.find(function (element: any) {
        return element.name == option.name;
      });
      setProductOptions(found.options);
    }
  };
  return (
    <>
      {options ? (
        <Listbox
          value={value ? value : ''}
          onChange={setValue}
          as="div"
          className="relative z-0 block w-full"
        >
          <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-gray-100 p-3 py-4">
            <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              {value ? value.name : placeholder}
            </p>
            <HiChevronDown size={20} />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className= "relative z-0 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? ' text-blue-800' : 'text-gray-900'
                    }`
                  }
                  value={option}
                  onClick={() => handleClick(option)}
                >
                  {({ value }) => (
                    <>
                      <span
                        className={`block truncate  ${
                          value
                            ? 'font-roboto-medium text-blue-800'
                            : 'font-roboto-regular'
                        }`}
                      >
                        {option.name}
                      </span>
                      {value ? (
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
      ) : null}
    </>
  );
};
