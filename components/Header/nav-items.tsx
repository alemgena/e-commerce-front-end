import { useState, useEffect, useRef } from 'react';
import { AiOutlinePlusCircle, AiFillHome } from 'react-icons/ai';
import { BiHeart, BiMessage } from 'react-icons/bi';

import { IoIosNotificationsOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import { AuthModal } from '../auth';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loginAction } from '@/store/login';
import { useMediaQuery } from 'react-responsive';
export function NavItems() {
  const md = useMediaQuery({ query: '(max-width: 576px)' });
  const [isOpenn, setIsOpenn] = useState(false);

  const toggleMenu = () => {
    setIsOpenn(!isOpenn);
  };
  const { loggedUser, isUserLogged } = useSelector(
    (state: RootStateOrAny) => state.login
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    dispatch(loginAction.setLoggedUser(''));
    dispatch(loginAction.setIsUserLogged(false));
    setIsLogin(false);
  };
  useEffect(() => {
    if (loggedUser) {
      setIsLogin(true);
    }
  }, []);
  const menuRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenn(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div className="flex items-center gap-8">
      {isLogin ||
        (isUserLogged && (
          <button
            onClick={() => router.push('/sell/products/create')}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 px-4 py-2 text-white"
          >
            <AiOutlinePlusCircle size={20} /> <p>Sell</p>
          </button>
        ))}

      <div className="flex gap-4">
        {isLogin || isUserLogged ? (
          <>
            {!md && (
              <button className="relative">
                <BiMessage size={30} className=" text-gray-900" />
                <div className="absolute -top-2 -right-1 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
                  <p>1</p>
                </div>
              </button>
            )}
          </>
        ) : null}
        {isLogin || isUserLogged ? (
          <>
            {!md && (
              <BiHeart
                onClick={() => router.push('/favorite')}
                size={30}
                className="cursor-pointer text-gray-900"
              />
            )}
          </>
        ) : null}

        {isLogin || isUserLogged ? (
          <>
            {!md && (
              <button
                className="relative"
                onClick={() => router.push('/notification')}
              >
                <IoIosNotificationsOutline
                  size={30}
                  className=" text-gray-900"
                />
                <div className="absolute -top-2 -right-1 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
                  <p>2</p>
                </div>
              </button>
            )}
          </>
        ) : null}
      </div>

      {isLogin || isUserLogged ? (
        <button
          onClick={() => handleLogout()}
          className={
            md
              ? 'ml-20 rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white'
              : 'rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white'
          }
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={
            md
              ? 'ml-20 rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white'
              : 'rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white'
          }
        >
          Login
        </button>
      )}
      <>
        {isLogin || isUserLogged ? (
          <>
            {!md && (
              <button
                onClick={() => router.push('/auth/profile')}
                className="rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white"
              >
                Profile
              </button>
            )}
          </>
        ) : null}
      </>
      <AuthModal
        setOpen={setIsOpen}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
