/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/order */
import { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import Footer from '../Footer/footer';
import BottomNavigation from '../bottomNavigation';
import { Header } from '../Header';
import FetchData from '../fetchData';
import store, { useAppDispatch } from '@/store/index';
import { AuthModal } from '../auth';
import { useRouter } from 'next/router';
import { closeModal } from '@/store/modal';
type Props = { children: React.ReactNode };

export function Layout({ children }: Props) {
  return (
    <Provider store={store}>
      <NextNProgress height={7} />
      <Header />
      <FetchData />
      <main className="-z-10 pt-2">{children}</main>
      <Footer />
      <BottomNavigation />
      <AuthModal />
      <ToastContainer autoClose={200} hideProgressBar position="top-right" />
    </Provider>
  );
}
