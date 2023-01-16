/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/order */
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

import Footer from '../Footer/footer';
import { Header } from '../Header';

import store from '@/store/index';

type Props = { children: React.ReactNode };

export function Layout({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem attribute="class">
        <NextNProgress height={7} />
        <Header />
        <main>{children}</main>
        <Footer/>
        <ToastContainer autoClose={200} hideProgressBar position="top-right" />
      </ThemeProvider>
    </Provider>
  );
}
