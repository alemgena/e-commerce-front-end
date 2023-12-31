import React, { useEffect } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { LOGIN } from '@/types';
import { loginAction } from '../../store/login';
import Notify from '../../components/Ui/Notify';
import { signIn } from 'next-auth/client';
import Notification from '../../components/Ui/Notification';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { Register } from './register';
import { ForgotPassword } from './forgotPassword';
import { closeModal, openModal } from '@/store/modal';
import { selectCurrentUser } from '@/store/auth';
import { FaRegUser, FaTimes } from 'react-icons/fa';
import { IoContract, IoContrastSharp } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
export const Login: React.FC = () => {
  const {t}=useTranslation()
  const { NotifyMessage, notify, setNotify } = Notify();
  const dispatch = useAppDispatch();
  const { input, password } = useAppSelector(
    (state: RootState) => state.login.inputValues
  );
  const { inputErr, passwordErr } = useAppSelector(
    (state: RootState) => state.login.inputErrors
  );
  const { user, token } = useAppSelector(selectCurrentUser);
  const { error, isLoading } = useAppSelector(
    (state: RootState) => state.login
  );
  console.log('isloading', isLoading);
  const handleLogin = () => {
    signIn('google');
    localStorage.setItem('logout','false');
  };
  useEffect(() => {
    if (error) {
      NotifyMessage({
        message: error?.message,
        type: 'error',
      });
    }
  }, [error]);
  useEffect(() => {
    if (token && user) {
      dispatch(loginAction.setInputErr(''));
      dispatch(loginAction.setPasswordErr(''));
      dispatch(closeModal());
    }
  }, [token, user]);
  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Resetting input errors to default
    dispatch(loginAction.setInputErr(''));
    dispatch(loginAction.setPasswordErr(''));
    let isValid = true;

    if (input.length < 4) {
      dispatch(
        loginAction.setInputErr('Email or Phone must be at least 4 characters!')
      );
      isValid = false;
    }
    if (password.length < 6) {
      dispatch(
        loginAction.setPasswordErr('Password must be at least 6 characters!')
      );
      isValid = false;
    }
    if (isValid) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch({ type: LOGIN, data: { input: input, password: password } });
  };
  return (
    <div className=" relative z-10 grid w-full px-6 py-8">
      <section>
        <Notification notify={notify} setNotify={setNotify} />
        <div>
          <div className="space-y-4">
            <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              <span className="flex-grow">{t("sign in to your account")}</span>
              <span className="ml-4 flex-shrink-0">
                <button>
                  <FaTimes
                    onClick={() => dispatch(closeModal())}
                    className="text-red-400"
                  />
                </button>
              </span>
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
                 {t("email or phone")}
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
                  {t("password")}
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
                  {t("forgot password")}?
                </a>
              </div>
              {/*  */}

              <button
                disabled={isLoading}
                type="submit"
                className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm10 0a2 2 0 11-4 0 2 2 0 014 0zm4 0a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-8 4a4 4 0 004-4h-4v4z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  t('sign in')
                )}
              </button>

              {/*  */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("don’t have an account yet")}?
                <a
                  href="#"
                  onClick={() => dispatch(openModal({ Component: Register }))}
                  className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t("sign up")}
                </a>
              </p>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  {t("or")}
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
                  <FcGoogle size={20} /> <p>{t("continue with google")}</p>
                </a>

                <a
                  className="font-small flex w-full items-center space-x-1 whitespace-nowrap rounded-lg border  bg-white px-5 py-2.5 text-sm text-[#111827] shadow-sm "
                  role="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <FaFacebookSquare size={20} className="text-blue-600" />{' '}
                  <p>{t("continue with facebook")}</p>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
