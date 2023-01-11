/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useRef, useState } from 'react';
import { GoGrabber } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';

import Theme from '../Header/theme/Theme';

import MenusContainer from './MenuContainer';

function MegaMenu() {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  function MegaMenuHandler() {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  }

  return (
    <div className="flex w-full flex-row items-center  justify-between bg-gray-100 py-2 px-0">
      <div className='px-0" flex w-full flex-row  items-center  bg-gray-100 '>
        <div
          onClick={MegaMenuHandler}
          className=" ml-10 flex cursor-pointer items-center font-roboto-bold hover:text-blue-400"
        >
          <h3 className="cursor-pointer ltr:ml-1 rtl:mr-1">category goods</h3>
        </div>
        <div className="flex cursor-pointer items-center px-3 font-roboto-bold hover:text-blue-400">
          <h3 className="ltr:ml-1 rtl:mr-1">Featured Products</h3>
        </div>
        <div className="flex cursor-pointer  items-center px-3 font-roboto-bold hover:text-blue-400">
          <h3 className="ltr:ml-1 rtl:mr-1">Discount</h3>
        </div>
        <div className="flex cursor-pointer items-center font-roboto-bold hover:text-blue-400">
          <h3 className="ltr:ml-1 rtl:mr-1">Habesha</h3>
        </div>
      </div>

      <div className="mr-40 hidden md:flex md:items-center md:justify-between">
        <Theme />
      </div>

      <Transition
        nodeRef={nodeRef}
        in={isMegaMenuOpen}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div ref={nodeRef} className="z-[100]">
            <div onClick={MegaMenuHandler} />
            <div className="absolute left-0  right-0 z-[110] mt-10 w-1/4  rounded-br-lg rounded-bl-lg bg-blue-50 shadow-md">
              <MenusContainer closeMenuMegaHandler={MegaMenuHandler} />
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default MegaMenu;
