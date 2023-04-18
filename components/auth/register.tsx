import React from 'react';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FaRegUser, FaTimes } from 'react-icons/fa';
import { registerAction } from '../../store/register';
import { REGISTER } from '@/types';
import Notify from '../../components/Ui/Notify';
import Notification from '../../components/Ui/Notification';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { closeModal, openModal } from '@/store/modal';
import { Login } from './login';

function validateEmail(email: string) {
  const email_pattern =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return email_pattern.test(email);
}

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { NotifyMessage, notify, setNotify } = Notify();
  const { first_name, last_name, email, phone, password1, password2 } =
    useAppSelector((state: RootState) => state.register.inputValues);
  const {
    firstNameErr,
    lastNameErr,
    emailErr,
    phoneErr,
    password1Err,
    password2Err,
  } = useAppSelector((state: RootState) => state.register.inputErrors);
  const { error, userInfo, isLoading } = useAppSelector(
    (state: RootState) => state.register
  );
  const [submit, setSubmit] = React.useState(false);
  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Resetting input errors to default
    dispatch(registerAction.setFirstNameErr(''));
    dispatch(registerAction.setLastNameErr(''));
    dispatch(registerAction.setEmailErr(''));
    dispatch(registerAction.setPassword1Err(''));
    dispatch(registerAction.setPassword2Err(''));
    dispatch(registerAction.setPhoneErr(''));
    let isValid = true;

    if (first_name.length < 4) {
      dispatch(
        registerAction.setFirstNameErr(
          'First name must be atleast 4 characters!'
        )
      );
      isValid = false;
    }
    if (last_name.length < 4) {
      dispatch(
        registerAction.setLastNameErr('Last name must be atleast 4 characters!')
      );
      isValid = false;
    }
    if (phone.replaceAll(' ', '').length !== 13) {
      dispatch(registerAction.setPhoneErr('Invalid phone number'));
      isValid = false;
    }
    if (!validateEmail(email)) {
      dispatch(registerAction.setEmailErr('Invalid Email'));
    }
    if (password1 !== password2) {
      dispatch(registerAction.setPassword2Err('Passwords must match!'));
      isValid = false;
    }
    if (password1.length < 6) {
      dispatch(
        registerAction.setPassword1Err('Password must be atleast 6 characters!')
      );
      isValid = false;
    }
    if (password2.length < 6) {
      dispatch(
        registerAction.setPassword2Err('Password must be atleast 6 characters!')
      );
      isValid = false;
    }
    if (!password1.match(/\d/) || !password1.match(/[a-zA-Z]/)) {
      dispatch(
        registerAction.setPassword1Err(
          'Password must contain at least one letter and one number'
        )
      );
      isValid = false;
    }

    if (isValid) {
      handleSubmit();
    }
  };
  React.useEffect(() => {
    if (error && submit) {
      NotifyMessage({
        message: error.message,
        type: 'error',
      });
    }
  }, [error]);
  React.useEffect(() => {
    if (userInfo && submit) {
      dispatch(openModal({ Component: Login }));
      setSubmit(false)
    }
  }, [userInfo]);
  console.log(userInfo);
  const handleSubmit = () => {
    dispatch({
      type: REGISTER,
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password1,
      },
    });
    setSubmit(true);
  };
  useAppSelector((state: RootState) => state.register.inputValues);
  return (
    // <section className="w-full">
    <section className="mx-auto flex flex-col items-center justify-center px-2 py-8 md:px-6">
      <Notification notify={notify} setNotify={setNotify} />
      <div className="w-full rounded-lg bg-white  sm:max-w-md md:mt-0 xl:p-0 ">
        <div className="flex flex-col items-center justify-start space-y-4 space-y-6">
          <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            <span className="flex-grow">Register To Liyu</span>
            <span className="ml-10 mt-1 flex-shrink-0">
              <button>
                <FaTimes
                  onClick={() => dispatch(closeModal())}
                  className="text-red-400"
                />
              </button>
            </span>
          </h1>
          <form
            className="grid gap-2 p-2 sm:grid-cols-2"
            onSubmit={(e) => validate(e)}
          >
            <div>
              <label
                htmlFor="First Name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                name="First Name"
                id="first_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:p-2.5 sm:text-sm"
                value={first_name}
                placeholder="First Name is Required"
                onChange={(e) => {
                  dispatch(registerAction.setFirstName(e.target.value));
                }}
              />{' '}
              {firstNameErr && (
                <div className="text-red-600">{firstNameErr}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="Last Name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                name="Last Name"
                id="last_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
                value={last_name}
                placeholder="Last Name is Required"
                onChange={(e) => {
                  dispatch(registerAction.setLastName(e.target.value));
                }}
              />
              {lastNameErr && <div className="text-red-600">{lastNameErr}</div>}
            </div>
            <div>
              <label
                htmlFor="Email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                name="Email"
                id="email"
                type="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50  p-1 text-gray-900  focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
                value={email}
                placeholder="Email is Required"
                onChange={(e) => {
                  dispatch(registerAction.setEmail(e.target.value));
                }}
              />
              {emailErr && <div className="text-red-600">{emailErr}</div>}
            </div>
            <div>
              <label
                htmlFor="Phone Number"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <input
                name="Phone Number"
                id="phone_number"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900  focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
                placeholder="+251911223344"
                value={phone}
                onChange={(e) => {
                  dispatch(registerAction.setPhone(e.target.value));
                }}
              />
              {phoneErr && <div className="text-red-600">{phoneErr}</div>}
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900  focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
                placeholder="Enter password"
                value={password1}
                onChange={(e) => {
                  dispatch(registerAction.setPassword1(e.target.value));
                }}
                type="password"
              />
              {password1Err && (
                <div className="text-red-600">{password1Err}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <input
                name="confirm"
                id="confirm_password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900  focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
                placeholder="Confirm password"
                value={password2}
                onChange={(e) => {
                  dispatch(registerAction.setPassword2(e.target.value));
                }}
                type="password"
              />
              {password2Err && (
                <div className="text-red-600">{password2Err}</div>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center rounded bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800"
            >
              {isLoading ? 'Signing up' : 'Sign up'}
            </button>
          </form>
          <div className="font-roboto-regular my-8 flex flex-col items-center gap-4 text-sm">
            <p>
              Already have an account?{' '}
              <span
                className="cursor-pointer text-blue-800"
                onClick={() => dispatch(openModal({ Component: Login }))}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
