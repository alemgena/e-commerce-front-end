import { useAppDispatch, useAppSelector } from '@/store';
import { openModal } from '@/store/modal';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Login } from '../auth/login';
import {
  removedCredentials,
  selectCurrentUser,
  setCredentials,
  User,
} from '@/store/auth';
import { loginAction } from '@/store/login';
const index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState();
  const y = useRef(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector(selectCurrentUser);
  const [redirectToSell, setRedirectToProfile] = useState(false);
  const handleRedirect = () => {
    if (token) {
      dispatch(loginAction.setIsUserLogged(true));
      setRedirectToProfile(true);
    } else {
      dispatch(
        openModal({
          Component: Login,
          callback: async () => {
            dispatch(loginAction.setIsUserLogged(true));
            setRedirectToProfile(true);
            return true;
          },
        })
      );
    }
  };
  useEffect(() => {
    if (user && token) {
      dispatch(loginAction.setIsUserLogged(true));
      if (redirectToSell) {
        router.push('/auth/profile');
        setRedirectToProfile(false);
      }
    }
  }, [user, token, redirectToSell]);
  const toggleVisibility = () => {
    if (window.pageYOffset <= y.current) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    y.current = window.pageYOffset;
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    // return window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = (e) => {
    setActive(e.target.id);
  };

  return (
    <div
      className={`sticky bottom-0 left-0 z-50  block ${
        !isVisible ? 'translate-y-full' : 'translate-y-0'
      } w-full bg-white shadow-2xl transition duration-150 ease-in-out lg:hidden`}
    >
      <div className="mx-auto grid h-full w-fit grid-cols-4 p-1 ">
        <button
          type="button"
          //   className="group hover:bg-gray-50 "
          id="home"
          onClick={(e) => {
            handleClick(e);
            router.push('/');
          }}
          className={`group rounded ${active == 'home' && ' text-primary-900'}
           px-4 py-1`}
        >
          <div className="pointer-events-none inline-flex flex-col items-center justify-center  ">
            <svg
              className="mb-1 h-5 w-5 group-hover:text-primary-900 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span className="text-sm  group-hover:text-primary-900">Home</span>
          </div>
        </button>
        <button
          type="button"
          id="Sell"
          onClick={(e) => {
            handleClick(e);
            router.push('/sell/products/create');
          }}
          className={`group rounded ${active == 'Sell' && 'text-primary-900'}
            px-4 py-1`}
        >
          <div className="pointer-events-none inline-flex flex-col items-center justify-center  ">
            <svg
              className="mb-1 h-5 w-5  group-hover:text-primary-900"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              ></path>
            </svg>
            <span className="text-sm  group-hover:text-primary-900">Sell</span>
          </div>
        </button>
        <button
          type="button"
          id="Settings"
          onClick={(e) => handleClick(e)}
          className={`group rounded ${
            active == 'Settings' && 'text-primary-900'
          } 
         px-4 py-1`}
        >
          <div className="pointer-events-none inline-flex flex-col items-center justify-center  ">
            <svg
              className="mb-1 h-5 w-5   group-hover:text-primary-900"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
            <span className="text-sm   group-hover:text-primary-900">
              Settings
            </span>
          </div>
        </button>
        <button
          id="Profile"
          onClick={handleRedirect}
          type="button"
          className={`group rounded ${
            active == 'Profile' && 'text-primary-900'
          } px-4 py-1`}
        >
          <div className="pointer-events-none inline-flex flex-col items-center justify-center  ">
            <svg
              className="mb-1 h-5 w-5   group-hover:text-primary-900"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              ></path>
            </svg>
            <span className="text-sm   group-hover:text-primary-900">
              Profile
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default index;
