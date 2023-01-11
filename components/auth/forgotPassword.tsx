import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { MdCall, MdLockOutline, MdPhone } from 'react-icons/md';

import { CurrentTab } from './modal';

interface IRegisterProps {
  onClose: () => void;
  setCurrentTab: (tab: CurrentTab) => void;
}

export const ForgotPassword: React.FC<IRegisterProps> = ({
  onClose,
  setCurrentTab,
}) => (
  <div className="mb-24 flex flex-col gap-14 ">
    <div className="mb-12 flex items-center justify-between">
      <h5 className="font-roboto-medium text-lg">Reset Password</h5>
      <span className=" cursor-pointer" onClick={onClose}>
        <AiOutlineClose />
      </span>
    </div>
    <div>
      <p className="content-center font-roboto-medium">
        Enter phone Number and Reset Your Password
      </p>
    </div>

    <div>
      <form
        className="flex flex-col gap-28 "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
          <span className="px-3">
            <MdCall />
          </span>
          <input
            type="text"
            placeholder="Phone Number"
            className="flex-grow py-1 focus:outline-none"
          />
        </div>

        <button className="rounded-full bg-blue-800 py-2  font-roboto-light text-lg text-white">
          Reset
        </button>
      </form>
    </div>
  </div>
);
