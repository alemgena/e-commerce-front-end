/* eslint-disable import/order */
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import NextNProgress from 'nextjs-progressbar';

import { Header } from '../Header';

import store from '@/store/index';

type Props = { children: React.ReactNode };

export function Layout({ children }: Props) {
  return (
    <Provider store={store}>
      <NextNProgress height={7} />
      <Header />
      <main>{children}</main>
      <ToastContainer autoClose={200} hideProgressBar position="top-right" />
    </Provider>
  );
}
