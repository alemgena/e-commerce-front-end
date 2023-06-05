import React, { useEffect, ChangeEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegUser, FaTimes } from 'react-icons/fa';
import { MdCall, MdLockOutline, MdPhone } from 'react-icons/md';
import { FORGET_PASSWORD } from '@/types';
import Notify from '../../components/Ui/Notify';
import Notification from '../../components/Ui/Notification';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { Login } from './login';
import { Register } from './register';
import { closeModal, openModal } from '@/store/modal';
import { useTranslation } from 'react-i18next';
export const ForgotPassword: React.FC = () => {
  const{t}=useTranslation()
  const dispatch = useAppDispatch();
  const { error, passwordRecovered, isLoading } = useAppSelector(
    (state: RootState) => state.recoverPassword
  );
  const [email, setEmail] = useState<string>();
  const [submit, setSubmit] = useState(false);
  const { NotifyMessage, notify, setNotify } = Notify();
  useEffect(() => {
    if (error && submit) {
      NotifyMessage({
        message: error.message,
        type: 'error',
      });
    }
  }, [error]);
  useEffect(() => {
    if (passwordRecovered && submit) {
      NotifyMessage({
        message: `Your new password is sent to ${email}. Check your email`,
        type: 'success',
      });
    }
  }, [passwordRecovered]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: FORGET_PASSWORD, email: { email: email } });
    setSubmit(true);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-12 font-sans">
      <Notification notify={notify} setNotify={setNotify} />
      <div className="max-w-sm">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          <span className="flex-grow">{t("reset your password")}</span>
          <span className="ml-4 flex-shrink-0">
            <button>
              <FaTimes
                onClick={() => dispatch(closeModal())}
                className="text-red-400"
              />
            </button>
          </span>
        </h1>
        <p className="mb-4 mt-4 text-center text-sm">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="">
            <label
              htmlFor="email-address"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm"
              value={email}
              placeholder="Email"
              required
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full justify-center rounded-lg bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            <span>
              {!isLoading ? 'Reset your password' : 'Resetting your password'}
            </span>
          </button>
        </form>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <a className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <span
              className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => dispatch(openModal({ Component: Register }))}
            >
              Sign up
            </span>
          </a>
        </div>
        <div className="text-center">
          <a className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <span
              className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => dispatch(openModal({ Component: Login }))}
            >
              Login
            </span>
          </a>
        </div>
      </div>
    </div>
    // <div className="mb-24 flex flex-col gap-14 ">
    //   <div className="mb-12 flex items-center justify-between">
    //     <h5 className="font-roboto-medium text-lg">Reset Password</h5>
    //     <Notification notify={notify} setNotify={setNotify} />
    //   </div>
    //   <div>
    //     <p className="font-roboto-medium content-center">
    //       Enter Email and Reset Your Password
    //     </p>
    //   </div>
    //   <div>
    //     <form
    //       className="flex flex-col gap-28 "
    //       onSubmit={(e) => handleSubmit(e)}
    //     >
    //       <div className="font-roboto-regular flex items-center gap-4 rounded-md px-2 py-3 shadow-sm">
    //         <span className="px-3">
    //           <MdCall />
    //         </span>
    //         <input
    //           value={email}
    //           type="text"
    //           placeholder="Email"
    //           onChange={onChange}
    //           className="flex-grow py-1 focus:outline-none"
    //         />
    //       </div>
    //       {isLoading ? (
    //         <button className="font-roboto-light rounded-full bg-blue-800  py-2 text-lg text-white">
    //           Reseting ....
    //         </button>
    //       ) : (
    //         <button className="font-roboto-light rounded-full bg-blue-800  py-2 text-lg text-white">
    //           Reset
    //         </button>
    //       )}
    //     </form>
    //   </div>
    // </div>
  );
};
