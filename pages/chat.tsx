/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';
import ProtectedRoute from '@/components/protected/protected';
import useFirebaseMessaging from '../components/firebase';
import axios from 'axios';
import { baseURL } from '@/config';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
import router from 'next/router';
const Chat = () => {
  const { token } = useFirebaseMessaging();
  const { NotifyMessage, notify, setNotify } = Notify();
  useEffect(() => {}, []);
  return (
    <ProtectedRoute>
      <div className=" mx-11 mb-32 bg-white">
        <div
          onClick={() => router.push('/chat')}
          className="my-4 flex items-center gap-2 bg-gray-50 py-4 text-xl hover:cursor-pointer"
        >
          <FiArrowLeft />
          <h2>Chat</h2>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <div className="grid  min-w-full  rounded bg-white sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
          <div className="border-r border-gray-100 bg-gray-100 lg:col-span-1">
            <ul className="h-64 overflow-auto sm:h-96">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              <li>
                <a className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="ml-2 block font-semibold text-gray-600">
                        Jhon Don
                      </span>
                      <span className="ml-2 block text-sm text-gray-600">
                        25 minutes
                      </span>
                    </div>
                    <span className="ml-2 block text-sm text-gray-600">
                      bye
                    </span>
                  </div>
                </a>
                <a className="flex cursor-pointer items-center border-b border-gray-300 bg-gray-100 px-3 py-2 text-sm transition duration-150 ease-in-out focus:outline-none">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="ml-2 block font-semibold text-gray-600">
                        Same
                      </span>
                      <span className="ml-2 block text-sm text-gray-600">
                        50 minutes
                      </span>
                    </div>
                    <span className="ml-2 block text-sm text-gray-600">
                      Good night
                    </span>
                  </div>
                </a>
                <a className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="ml-2 block font-semibold text-gray-600">
                        Emma
                      </span>
                      <span className="ml-2 block text-sm text-gray-600">
                        6 hour
                      </span>
                    </div>
                    <span className="ml-2 block text-sm text-gray-600">
                      Good Morning
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="ml-4 border-red-800 bg-gray-200 lg:col-span-2 lg:ml-2 lg:block">
            <div className="w-full">
              <div className="relative flex items-center border-b border-gray-300 p-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <div className="ml-2 flex flex-col justify-center">
                  <span className="block font-bold text-gray-600">Emma</span>
                  <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-green-600" />
                </div>
              </div>

              <div className="relative flex items-center border-b border-gray-300 p-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <span className="ml-2 block font-bold text-gray-600">Emma</span>
                <span className="absolute left-10 top-3 h-3 w-3 rounded-full bg-green-600"></span>
              </div>

              <div className="relative h-screen w-full overflow-y-auto p-6 sm:h-[40rem]">
                <ul className="space-y-2">
                  <li className="flex justify-start">
                    <div className="relative max-w-xl rounded px-4 py-2 text-gray-700 shadow">
                      <span className="block">Hi</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                      <span className="block">Hiiii</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                      <span className="block">how are you?</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl rounded px-4 py-2 text-gray-700 shadow">
                      <span className="block">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex w-full flex-col items-center justify-between border-t border-gray-300 p-3 sm:flex-row">
                <div className="flex items-center border-t border-gray-300 p-3">
                  <input
                    type="text"
                    placeholder="Say Somethings"
                    className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-2 outline-none focus:text-gray-700 sm:w-auto"
                    name="message"
                    required
                  />
                  <button
                    type="submit"
                    className="h-10 w-10 items-center rounded-full bg-blue-800 p-3"
                  >
                    <BiSend
                      size={25}
                      color="white"
                      className="mb-2 items-center"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Chat;
