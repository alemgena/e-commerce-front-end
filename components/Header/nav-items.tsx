import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlusCircle, AiFillHome } from 'react-icons/ai';
import { BiHeart, BiMessage } from 'react-icons/bi';

import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/store';
import { openModal } from '@/store/modal';
import { Login } from '../auth/login';
import {
  removedCredentials,
  selectCurrentUser,
  setCredentials,
  User,
} from '@/store/auth';
import { Register } from '../auth/register';
export function NavItems() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userInfo');
    if (user && token) {
      const data = JSON.parse(user) as User;
      dispatch(setCredentials({ user: data, token }));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    dispatch(removedCredentials());
    // dispatch(loginAction.setIsUserLogged(false));
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => router.push('/sell/products/create')}
        className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 px-4 py-2 text-white lg:flex"
      >
        <AiOutlinePlusCircle size={20} /> <p>Sell</p>
      </button>

      <div className="flex items-center justify-center gap-4">
        {!!user.token && (
          <>
            <button className="relative">
              <BiMessage size={30} className=" text-gray-900" />
              <div className="absolute -top-2 -right-1 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
                <p>1</p>
              </div>
            </button>
            <BiHeart
              onClick={() => router.push('/favorite')}
              size={30}
              className="cursor-pointer text-gray-900"
            />

            <button
              className="relative"
              onClick={() => router.push('/notification')}
            >
              <IoIosNotificationsOutline size={30} className=" text-gray-900" />
              <div className="absolute -top-2 -right-1 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
                <p>2</p>
              </div>
            </button>

            <CgProfile
              size={30}
              onClick={() => router.push('/auth/profile')}
              className=" cursor-pointer text-gray-900"
            />
          </>
        )}

        {!!user.token ? (
          <FiLogOut
            size={30}
            onClick={() => handleLogout()}
            className=" cursor-pointer text-gray-900"
          />
        ) : (
          <>
            {' '}
            <button
              onClick={() => dispatch(openModal({ Component: Login }))}
              type="button"
              className="hover:border-primary-accent-100 active:border-primary-accent-200 inline-block rounded border-2 border-primary-100 py-2 px-4 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0"
              data-te-ripple-init
            >
              Login
            </button>
            <button
              onClick={() => dispatch(openModal({ Component: Register }))}
              type="button"
              className="hover:border-primary-accent-100 active:border-primary-accent-200 py-2 px-4 inline-block rounded border-2 border-primary-100 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0"
              data-te-ripple-init
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}
