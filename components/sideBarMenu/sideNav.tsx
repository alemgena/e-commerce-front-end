/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

interface Props {
  // eslint-disable-next-line react/require-default-props
  state?: string;
  onClose: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: React.ReactNode;
  ref: React.HTMLProps<HTMLDivElement>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SideNav = forwardRef<HTMLDivElement, Props>(({ state }, ref) => (
  <div
    ref={ref}
    className="bg-palette-card fixed top-0 z-[1000] h-screen w-[90%] max-w-[380px] origin-left overflow-y-auto shadow-md "
  >
    <div className="absolute top-3 cursor-pointer text-4xl ltr:left-0 ltr:ml-[85%]   rtl:right-0 rtl:mr-[85%] " />
    <div className="pt-5 pb-3 ltr:pl-4 rtl:pr-5">
      <img src="/images/logo.svg" />
    </div>
    <hr />
  </div>
));

SideNav.displayName = 'SideNav';

export default SideNav;
