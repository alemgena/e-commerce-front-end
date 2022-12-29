import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { CurrentTab } from './modal';

interface IRegisterProps {
  onClose: () => void;
  setCurrentTab: (tab: CurrentTab) => void;
}

export const Register: React.FC<IRegisterProps> = ({
  onClose,
  setCurrentTab,
}) => {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h5 className="font-roboto-medium text-lg">Register</h5>
        <span className=" cursor-pointer" onClick={onClose}>
          <AiOutlineClose />
        </span>
      </div>
      <div>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <FaRegUser />
            </span>
            <input
              type="text"
              placeholder="Full name"
              className="flex-grow py-1 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdPhone />
            </span>
            <input
              type="text"
              placeholder="+251911223344"
              className="flex-grow py-1 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdLockOutline />
            </span>
            <input
              type="password"
              placeholder="Enter password"
              className="flex-grow py-1 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdLockOutline />
            </span>
            <input
              type="password"
              placeholder="Confirm password"
              className="flex-grow py-1 focus:outline-none"
            />
          </div>
          <button className="rounded-full bg-blue-800 py-2 font-roboto-light text-lg text-white">
            REGISTER
          </button>
        </form>
        <div className="my-8 flex flex-col items-center gap-4 font-roboto-regular text-sm">
          <p>
            <span
              className="cursor-pointer text-blue-800"
              onClick={() => setCurrentTab('Login')}
            >
              Login
            </span>{' '}
            if already have an account
          </p>
        </div>
      </div>
    </div>
  );
};
