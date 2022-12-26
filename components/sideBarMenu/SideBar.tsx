/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { GoGrabber } from 'react-icons/go';
import { Transition } from 'react-transition-group';

import SideNav from './sideNav';

export interface IDropDown {
  title: string;
  url?: string;
  subtitles: string[];
}

export interface ISideNavBar {
  isSidebarOpen: boolean;
  isNavbarOpen: boolean;
  dropDownList: IDropDown[];
}

export interface ISideNavBarRootState {
  sideNavBar: ISideNavBar;
}

function SideBar() {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [isNavbarOpen, setisNavbarOpen] = useState(false);

  const closeNav = () => {
    setisNavbarOpen(false);
  };

  const openNavBar = () => {
    setisNavbarOpen(true);
  };

  return (
    <div className="md:hidden">
      <div onClick={openNavBar}>
        <GoGrabber style={{ fontSize: '2rem' }} />
      </div>
      <Transition
        nodeRef={nodeRef}
        in={isNavbarOpen!}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <>
            <SideNav ref={nodeRef} state={state} onClose={closeNav} />
            <div
              className={`fixed inset-0 z-[999] bg-black/60
                  ${
                    state === 'entering'
                      ? 'animate-fadeEntering'
                      : state === 'entered'
                      ? 'opacity-100'
                      : 'animate-fadeExit'
                  }
                  `}
              onClick={closeNav}
            />
          </>
        )}
      </Transition>
    </div>
  );
}
export default SideBar;
