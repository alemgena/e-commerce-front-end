import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { CurrentTab } from './modal';

interface ILoginProps {
  onClose: () => void;
  setCurrentTab: (tab: CurrentTab) => void;
}

export const Login: React.FC<ILoginProps> = ({ onClose, setCurrentTab }) => {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h5 className="font-roboto-medium text-lg">Login</h5>
        <span className=" cursor-pointer" onClick={onClose}>
          <AiOutlineClose />
        </span>
      </div>
      <div>
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
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
          <button className="rounded-full bg-blue-800 py-2 font-roboto-light text-lg text-white">
            LOGIN
          </button>
        </form>
        <div className="mt-4 flex flex-col items-center gap-4 font-roboto-regular text-sm">
          <p className="cursor-pointer text-blue-800">Forgot password?</p>
          <p>
            if you don't have an account{' '}
            <span
              className="cursor-pointer text-blue-800"
              onClick={() => setCurrentTab('Register')}
            >
              Register
            </span>
          </p>
        </div>

        <div className="my-6 flex items-center gap-3 font-roboto-medium">
          <div className="h-0.5 flex-grow rounded-full bg-gray-100" />
          <h6>OR</h6>
          <div className="h-0.5 flex-grow rounded-full bg-gray-100" />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 font-roboto-regular text-sm">
            <FcGoogle size={25} /> <p>Continute with Google</p>
          </button>
          <button className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 font-roboto-regular text-sm">
            <FaFacebookSquare size={25} className="text-blue-600" />
            <p>Continute with Facebook</p>
          </button>
        </div>
      </div>
    </div>
  );
};
