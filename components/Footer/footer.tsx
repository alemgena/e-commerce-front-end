import React from 'react';
import { IoIosMail, IoMdCall } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import PlaystoreSVG from './playstore-svg';
import AppStoreSVG from './appstore-svg';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
function Footer() {
  const {t}=useTranslation()
  let currentTime = new Date();
  const year = currentTime.getFullYear();

  return (
    <div className="m-2 mx-auto rounded-lg bg-green-700 font-sans shadow md:m-4 ">
      <div className="container mx-auto ml-2 flex w-full justify-center p-4 sm:block sm:p-6">
        <div className="md:min-w-screen-md grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-1 md:col-span-1 ">
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              {t('company')}
            </h2>
            <ul className="text-white">
              <li className="mb-4 hover:cursor-pointer">
                <a
                  onClick={() => router.push('/about')}
                  className="hover:underline"
                >
                  {t('about us')}
                </a>
              </li>
              <li className="mb-4 hover:cursor-pointer">
                <a
                  onClick={() => router.push('/terms-of-use')}
                  className="hover:underline"
                >
                  {t('terms and conditions')}
                </a>
              </li>
              <li className="mb-4 hover:cursor-pointer">
                <a
                  onClick={() => router.push('/privacy-policy')}
                  className="hover:underline"
                >
                  {t('privacy policy')}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1 ">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                {t('contact us')}
              </h2>
              <ul className="text-white">
                <li className="mb-4">
                  <a
                    href="tel:+251946841922"
                    className="flex items-center justify-start gap-x-4 hover:underline"
                  >
                    <span>
                      <IoMdCall size={20} />
                    </span>
                    <span>+251946841922</span>{' '}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="#"
                    className="flex items-center justify-start gap-x-4 hover:underline"
                  >
                    <span>
                      <IoIosMail size={20} />
                    </span>
                    <span>support@liyumarket.com</span>
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="#"
                    className="flex items-center justify-start gap-x-4 hover:underline"
                  >
                    <span>
                      <IoLocationSharp size={20} />
                    </span>
                    <span>Country Tower 3rd Floor Piyassa</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              {t('download on')}{' '}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2  ">
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-white sm:mr-4">
                <PlaystoreSVG />
                <div className="flex h-full flex-col justify-between uppercase">
                  <div className="text-xs">{t('download on')}</div>
                  <div className="font-roboto mt-1 text-sm font-bold">
                    {t('google play store')}
                  </div>
                </div>
              </div>
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-white sm:mr-4">
                <AppStoreSVG />
                <div className="flex h-full flex-col justify-between">
                  <div className="text-xs">{t('download on')}</div>
                  <div className="mt-1 font-sans font-bold uppercase">
                    {t('app store')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-center p-4 md:p-6">
        <span className="text-center text-sm text-gray-800 dark:text-gray-600 sm:text-center">
          All rights are reserved! | Liyu Market {year}
        </span>
      </div>
    </div>
  );
}

export default Footer;
