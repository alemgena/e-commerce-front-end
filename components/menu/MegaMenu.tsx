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

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(true);
  function MegaMenuHandler() {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  }

  return (
    <div className=" flex  flex-row items-center  justify-between bg-gray-100 py-2 px-0">
      <div
        onClick={MegaMenuHandler}
        className=" flex flex-row items-center bg-gray-100  "
      ></div>

      <div className="">
        <div className="z-[100]">
          <div className=" absolute z-[110]   w-80 rounded-br-lg rounded-bl-lg bg-blue-50 shadow-md">
            <MenusContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
