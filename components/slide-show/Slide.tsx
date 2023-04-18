import React from 'react';
import Link from 'next/link';

interface Props {
  ID?: number;
  title: string;
  description: string;
  bgImg: string;
  url: string;
}
const Slide: React.FC<Props> = ({ title, description, bgImg, url }) => {
  return (
    <>
      <div
        className={`relative h-[30vh] w-[100%] bg-cover bg-center bg-no-repeat md:h-[40vh]`}
        style={{ backgroundImage: `${bgImg}` }}
      >
        <Link href={url}>
          <a className="block">
            <div
              className={`bg-palette-card/60 absolute bottom-0 rounded-md p-3 shadow-lg backdrop-blur-[12px] backdrop-filter ltr:text-left rtl:text-right md:bottom-auto md:right-[25%] md:top-[45%] md:mt-auto md:w-[60%] md:overflow-hidden md:p-8 lg:w-[50%] lg:p-10`}
            >
              <h3 className="text-lg font-medium md:text-2xl lg:text-3xl">
                {[`${title}`]}
              </h3>
              <p className="mt-2 text-[13px] md:mt-4 md:text-lg lg:mt-8">
                {[`${description}`]}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Slide;
