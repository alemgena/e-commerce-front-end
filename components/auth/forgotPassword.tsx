import React, { useEffect, ChangeEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { MdCall, MdLockOutline, MdPhone } from 'react-icons/md';
import { FORGET_PASSWORD } from '@/types';
import { CurrentTab } from './modal';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

interface IRegisterProps {
  onClose: () => void;
  setCurrentTab: (tab: CurrentTab) => void;
}

export const ForgotPassword: React.FC<IRegisterProps> = ({
  onClose,
  setCurrentTab,
}) => {
  const dispatch = useDispatch();
  const { error, passwordRecovered } = useSelector(
    (state: RootStateOrAny) => state.recoverPassword
  );
  const [email, setEmail] = useState();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Rrrrr');
    dispatch({ type: FORGET_PASSWORD, email: { email: email } });
    console.log('Rrrrr');
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  return (
    <div className="mb-24 flex flex-col gap-14 ">
      <div className="mb-12 flex items-center justify-between">
        <h5 className="font-roboto-medium text-lg">Reset Password</h5>
        <div>{error.message && <span>{error.message}</span>}</div>
        <div>
          {passwordRecovered && (
            <span>Your new password is sent to {email}. Check your email</span>
          )}
        </div>
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
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdCall />
            </span>
            <input
              value={email}
              type="text"
              placeholder="Email"
              className="flex-grow py-1 focus:outline-none"
              onChange={onChange}
            />
          </div>
          <button className="rounded-full bg-blue-800 py-2  font-roboto-light text-lg text-white">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};
