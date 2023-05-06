import { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiHeart, BiMessage } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
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
import { RootStateOrAny } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { baseURL } from '@/config';
import React from 'react';
import {
  Logout,
  PersonAdd,
  ProductionQuantityLimits,
  Settings,
  ShopRounded,
} from '@mui/icons-material';
import { RiProfileFill } from 'react-icons/ri';
import { IoChevronDown } from 'react-icons/io5';
import timeSince from '@/lib/types/time-since';
let notificatioCount: any;
export function NavItems() {
  const { user, token } = useAppSelector(selectCurrentUser);
  const [redirectToSell, setRedirectToSell] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    router.push('/');
  };
  //notification
  const { notificationCount } = useAppSelector(
    (state: RootStateOrAny) => state.notification
  );
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
    <div className="relative z-50  mr-10 flex items-center justify-start gap-3">
      <Tooltip title={'Sell'}>
        <button
          onClick={handleClick}
          className="hidden items-center gap-2 
          rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 px-4 py-1 text-white lg:flex"
        >
          <AiOutlinePlusCircle size={14} /> <p>Sell</p>
        </button>
      </Tooltip>

      <div className="flex items-center justify-center gap-4">
        {!!user && token && (
          <>
            <Tooltip title={'Message'}>
              <button onClick={() => router.push('/chat')} className="relative">
                <BiMessage
                  size={30}
                  className={`${
                    router.route === '/chat'
                      ? 'text-blue-700'
                      : 'cursor-pointer text-gray-900'
                  }`}
                />
                <div className="absolute -right-1 -top-2 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
                  <p>1</p>
                </div>
              </button>
            </Tooltip>

            <Tooltip title={'Favorite'}>
              <button onClick={() => router.push('/favorite')}>
                <BiHeart
                  className={`${
                    router.route === '/favorite'
                      ? 'text-blue-700'
                      : 'cursor-pointer text-gray-900'
                  }`}
                  size={30}
                />
              </button>
            </Tooltip>
            <Tooltip title={'Notifications'}>
              <button
                className="relative"
                onClick={() => router.push('/notification')}
              >
                <IoIosNotificationsOutline
                  size={30}
                  className={`${
                    router.route === '/notification'
                      ? 'text-blue-700'
                      : 'cursor-pointer text-gray-900'
                  }`}
                />
                {notificationCount && (
                  <div className="absolute -right-1 -top-2 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
                    <p>{notificationCount}</p>
                  </div>
                )}
              </button>
            </Tooltip>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onMouseEnter={handleClickProfile}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  {token ? (
                    <>
                      <div
                        onClick={() => router.push('/auth/profile/')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        className="flex"
                      >
                        <Avatar
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                          src={`${baseURL}${
                            user.user ? user?.user?.imageURL : user?.imageURL
                          }`}
                          className="cursor-pointer rounded-3xl bg-gray-400"
                        />{' '}
                        <div className="ml-2 font-bold">
                          <Typography
                            variant="subtitle1"
                            className="mb-0 text-black"
                          >
                            {`${user?.user?.first_name}`}
                          </Typography>
                          <Typography variant="subtitle2" className="">
                            {`${timeSince(user?.user?.createdAt, true)} ${' '}`}{' '}
                            on Liyu
                          </Typography>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div onClick={() => router.push('/auth/signin')}>
                      <Avatar className="cursor-pointer">
                        <FaUserCircle size={30} />
                        <span
                          className="absolute bottom-0 left-7
                          h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"
                        ></span>
                      </Avatar>
                    </div>
                  )}

                  {/*  */}
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onMouseLeave={handleClose}
              onClick={handleClose}
              // other props
            >
              {/* menu items */}

              <MenuItem onClick={() => router.push('/auth/profile')}>
                <ListItemIcon>
                  <RiProfileFill fontSize="small" />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem
                className="hover:cursor-pointer"
                onClick={() => router.push('/my-products')}
              >
                <ListItemIcon>
                  <FiShoppingCart />
                </ListItemIcon>
                My Product
              </MenuItem>
              {!!user && token ? (
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              ) : null}
            </Menu>
          </>
        )}
        {!(!!user && token) ? (
          <>
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
        ) : null}
      </div>
    </div>
  );
}
