/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useRef, useState } from 'react';
import { GoGrabber } from 'react-icons/go';
import { Transition } from 'react-transition-group';

import MenusContainer from './MenuContainer';

// import MenusContainer from './MenuContainer';

export interface IMegaMenuShow {
  isMegaMenuOpen: boolean;
}

export interface IMegaMenuRootState {
  megaMenu: IMegaMenuShow;
}

function MegaMenu() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMegaMenuOpen, setisMegaMenuOpen] = useState(false);
  function showMegaMenuHandler() {
    setisMegaMenuOpen(true);
  }
  function closeMegaMenuHandler() {
    setisMegaMenuOpen(false);
  }

  return (
    <div
      className="flex items-center"
      onMouseOver={showMegaMenuHandler}
      onMouseOut={closeMegaMenuHandler}
    >
      <div className="flex cursor-pointer items-center font-bold">
        <GoGrabber style={{ fontSize: '2rem' }} />
        <h3 className=" mr-2 ltr:ml-1 rtl:mr-1">category goods</h3>
      </div>
      <div className=" mr-2  flex cursor-pointer items-center font-bold hover:bg-blue-600 ">
        <h3 className="ltr:ml-1 rtl:mr-1">Featured Products</h3>
      </div>

      <div className=" mr-2 flex cursor-pointer items-center font-bold hover:bg-blue-600">
        <h3 className="ltr:ml-1 rtl:mr-1">Best Selling</h3>
      </div>

      <div className="mr-2 flex cursor-pointer items-center font-bold hover:bg-blue-600 ">
        <h3 className="ltr:ml-1 rtl:mr-1">Discount </h3>
      </div>
      <div className="mr-2 flex cursor-pointer items-center font-bold hover:bg-blue-600 ">
        <h3 className="ltr:ml-1 rtl:mr-1">Habesha</h3>
      </div>
      <Transition
        nodeRef={nodeRef}
        in={isMegaMenuOpen!}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div ref={nodeRef} className="z-[100]">
            <div
              className={`fixed inset-0 top-[8.2rem] bg-gray-600/60
                ${
                  state === 'entering'
                    ? 'animate-fadeEntering'
                    : state === 'entered'
                    ? 'opacity-100'
                    : 'animate-fadeExit'
                }
                `}
              onClick={closeMegaMenuHandler}
            />
            <div className="bg-palette-card absolute top-full left-0 right-0 z-[110] rounded-br-lg rounded-bl-lg shadow-md">
              <MenusContainer />
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default MegaMenu;
