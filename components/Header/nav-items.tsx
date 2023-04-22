import { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiHeart, BiMessage } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Avatar } from '@mui/material';
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
import { loginAction } from '@/store/login';
export function NavItems() {
  const { user, token } = useAppSelector(selectCurrentUser);
  const [redirectToSell, setRedirectToSell] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo && token) {
      const data = JSON.parse(userInfo) as User;
      dispatch(setCredentials({ user: data, token }));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
   localStorage.removeItem('logout');
    dispatch(removedCredentials());
    router.push('/')
  };
  
  const handleClick = () => {
    if (token) {
      dispatch(loginAction.setIsUserLogged(true));
      setRedirectToSell(true);
    } else {
      dispatch(
        openModal({
          Component: Login,
          callback: async () => {
            dispatch(loginAction.setIsUserLogged(true));
            setRedirectToSell(true);
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
        router.push('/sell/products/create');
        setRedirectToSell(false);
      }
    }
  }, [user, token, redirectToSell]);

  return (
    <div className="relative z-50 flex items-center justify-between gap-2">
      <button
        onClick={handleClick}
        className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 px-4 py-2 text-white lg:flex"
      >
        <AiOutlinePlusCircle size={20} /> <p>Sell</p>
      </button>

      <div className="flex items-center justify-center gap-4">
        {!!user && token && (
          <>
            <button className="relative">
              <BiMessage size={30} className=" text-gray-900" />
              <div className="absolute -right-1 -top-2 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
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
              <div className="absolute -right-1 -top-2 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
                <p>2</p>
              </div>
            </button>
            {token ? (
              <div onClick={() => router.push('/auth/profile')}>
                <Avatar
                  src={`https://api.liyumarket.com/${user.user?user.user.imageURL:user.imageURL}`}
                  alt="User profile image"
                  onClick={() => router.push('/auth/profile')}
                  className="cursor-pointer"
                />
              </div>
            ) : (
              <div onClick={() => router.push('/auth/signin')}>
                <Avatar className="cursor-pointer">
                  <CgProfile size={30} />
                </Avatar>
              </div>
            )}
          </>
        )}

        {!!user && token ? (
          <FiLogOut
            size={30}
            onClick={() => handleLogout()}
            className=" cursor-pointer text-gray-900"
          />
        ) : (
          <>
            {' '}
            <button
              onClick={() =>
                dispatch(
                  openModal({
                    Component: Login,
                    authenticated: false,
                  })
                )
              }
              type="button"
              className="hover:border-primary-accent-100 active:border-primary-accent-200 inline-block rounded border-2 border-primary-100 px-4 py-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0"
              data-te-ripple-init
            >
              Login
            </button>
            <button
              onClick={() =>
                dispatch(
                  openModal({
                    Component: Register,
                    authenticated: false,
                  })
                )
              }
              type="button"
              className="hover:border-primary-accent-100 active:border-primary-accent-200 inline-block rounded border-2 border-primary-100 px-4 py-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0"
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
