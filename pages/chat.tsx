/* eslint-disable react/button-has-type */
import React from 'react';
import { BiSend } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';
import ProtectedRoute from '@/components/ProtectedRoute';
const chat = () => (
  <ProtectedRoute>
  <div className=" mx-11 mb-32 bg-white">
    <div className="my-4 flex items-center gap-2 bg-gray-50 py-4 text-xl">
      <FiArrowLeft />
      <h2>Chat</h2>
    </div>
    <div className="grid  min-w-full  grid-cols-3  rounded bg-white">
      <div className=" border-r border-gray-100 bg-gray-100 lg:col-span-1">
        <ul className="h-[32rem] overflow-auto">
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
                <span className="ml-2 block text-sm text-gray-600">bye</span>
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
      <div className="ml-24 hidden border-red-800  bg-gray-200 lg:col-span-2 lg:block">
        <div className="w-full">
          <div className="relative flex items-center border-b border-gray-300 p-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
              alt="username"
            />
            <span className="ml-2 block font-bold text-gray-600">Emma</span>
            <span className="absolute left-10 top-3 h-3 w-3 rounded-full bg-green-600" />
          </div>
          <div className="relative h-[40rem] w-full overflow-y-auto p-6">
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
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex w-full items-center justify-between border-t border-gray-300 p-3">
            <input
              type="text"
              placeholder="Say Somethings"
              className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-2 outline-none focus:text-gray-700"
              name="message"
              required
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="m-3 h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
            <button
              type="submit"
              className="mx-3 h-10 w-10 items-center rounded-full bg-blue-800 p-3 "
            >
              {/* <svg
                className="m-3 h-8 w-8 origin-center rotate-90 transform  text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg> */}
              <BiSend size={25} color="white" className="mb-2 items-center" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </ProtectedRoute>
);

export default chat;
