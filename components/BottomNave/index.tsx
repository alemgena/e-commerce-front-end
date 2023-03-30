import Link from 'next/link';
import React,{useState,useEffect} from 'react';
import { useSelector,RootStateOrAny,useDispatch } from 'react-redux';
import { AiOutlinePlusCircle, AiFillHome } from 'react-icons/ai';
import { BiHeart, BiMessage } from 'react-icons/bi';
import{HiOutlineUserCircle} from 'react-icons/hi'
import {useRouter} from 'next/router'
import { loginAction } from '@/store/login';
import { IoIosNotificationsOutline } from 'react-icons/io';
function BottomNavbar() {

  return (
    <nav className="fixed bottom-0 left-0 flex w-full justify-between  bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 p-4 text-white">
      <Link href="/">
        <a className="flex flex-col items-center">
          <AiFillHome size={30} className="mb-1 h-5 w-5" />
          <span className="text-2xl">Home</span>
        </a>
      </Link>
      <Link href="/sell/products/create">
        <a className="flex flex-col items-center">
          <AiOutlinePlusCircle size={50} className="mb-1 h-5 w-5" />
          <span className="text-2xl">Sell</span>
        </a>
      </Link>
      <Link href="/chat">
        <a className="flex flex-col items-center">
          <BiMessage className="mb-1 h-5 w-5" />
          <span className="text-2xl">Message</span>
        </a>
      </Link>
      <Link href="/notification">
        <a className="flex flex-col items-center">
          <IoIosNotificationsOutline className="mb-1 h-5 w-5" />
          <span className="text-2xl">Notification</span>
        </a>
      </Link>
      <Link href="/favorite">
        <a className="flex flex-col items-center">
          <BiHeart className="mb-1 h-5 w-5" />
          <span className="text-2xl">Favorite</span>
        </a>
      </Link>
      <Link href="/auth/profile">
        <a className="flex flex-col items-center">
          <HiOutlineUserCircle className="mb-1 h-5 w-5" />
          <span className="text-2xl">Profile</span>
        </a>
      </Link>
    </nav>
  );
}

export default BottomNavbar;
