import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { CurrentTab } from './modal';
import { LOGIN } from '@/types';
import { loginAction } from '../../store/login';
import Notify from '../../components/Ui/Notify';
import { signIn, signOut, getSession, useSession } from 'next-auth/client';
import Notification from '../../components/Ui/Notification';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { Register } from './register';
import { ForgotPassword } from './forgotPassword';
import { openModal } from '@/store/modal';
export const Login: React.FC = () => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const dispatch = useAppDispatch();
  const [submit, setSubmit] = React.useState(false);
  const { input, password } = useAppSelector(
    (state: RootState) => state.login.inputValues
  );
  const { inputErr, passwordErr } = useAppSelector(
    (state: RootState) => state.login.inputErrors
  );
  const { error, loggedUser, isLoading } = useAppSelector(
    (state: RootState) => state.login
  );
  const handleLogin = () => {
    signIn('google');
  };
  useEffect(() => {
    if (error && submit) {
      NotifyMessage({
        message: error.message,
        type: 'error',
      });
    }
  }, [error]);
  useEffect(() => {
    if (loggedUser && submit) {
      // setOpen(false);
    }
  }, [loggedUser]);
  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Resetting input errors to default
    dispatch(loginAction.setInputErr(''));
    dispatch(loginAction.setPasswordErr(''));
    let isValid = true;

    if (input.length < 4) {
      dispatch(
        loginAction.setInputErr('Email or Phone must be atleast 4 characters!')
      );
      isValid = false;
    }
    if (password.length < 6) {
      dispatch(
        loginAction.setPasswordErr('Password must be atleast 6 characters!')
      );
      isValid = false;
    }
    if (isValid) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch({ type: LOGIN, data: { input: input, password: password } });
    setSubmit(true);
  };
  return (
    <div className=" relative z-10 grid w-full px-6 py-8">
      <section>
        <Notification notify={notify} setNotify={setNotify} />
        <div>
          <div className="space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => validate(e)}
            >
              <div>
                <label
                  htmlFor="emailOrPhone"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Email or Phone
                </label>
                <input
                  name="emailOrPhone"
                  id="emailOrPhone"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  value={input}
                  placeholder="Enter Email or Phone"
                  onChange={(e) => {
                    dispatch(loginAction.setInput(e.target.value));
                  }}
                />{' '}
                {inputErr && <div className="text-red-600">{inputErr}</div>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    dispatch(loginAction.setPassword(e.target.value));
                  }}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
                {passwordErr && (
                  <div className="text-red-600">{passwordErr}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="cursor-pointer text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={() =>
                    dispatch(openModal({ Component: ForgotPassword }))
                  }
                >
                  Forgot password?
                </a>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href="#"
                  onClick={() => dispatch(openModal({ Component: Register }))}
                  className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>
              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
                <a
                  className="font-small flex w-full items-center space-x-1 whitespace-nowrap rounded-lg border bg-white  px-5 py-2.5 text-sm text-[#111827]  shadow-sm "
                  role="button"
                  data-te-ripple-init
                  onClick={() => handleLogin()}
                  data-te-ripple-color="light"
                >
                  <FcGoogle size={20} /> <p>Continue with Google</p>
                </a>

                <a
                  className="font-small flex w-full items-center space-x-1 whitespace-nowrap rounded-lg border  bg-white px-5 py-2.5 text-sm text-[#111827] shadow-sm "
                  role="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <FaFacebookSquare size={20} className="text-blue-600" />{' '}
                  <p>Continue with Facebook</p>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
