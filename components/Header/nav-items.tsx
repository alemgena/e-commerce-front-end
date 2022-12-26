/* eslint-disable react/button-has-type */
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiHeart, BiMessage } from 'react-icons/bi';

export function NavItems() {
  return (
    <div className="flex items-center gap-8">
      <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 px-4 py-2 text-white">
        <AiOutlinePlusCircle size={20} /> <p>Sell</p>
      </button>
      <div className="flex gap-4">
        <button className="relative">
          <BiMessage size={30} className=" text-gray-900" />
          <div className="absolute -top-2 -right-1 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
            <p>1</p>
          </div>
        </button>
        <BiHeart size={30} className="cursor-pointer text-gray-900" />
      </div>

      <button className="rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white">
        Login
      </button>
    </div>
  );
}
