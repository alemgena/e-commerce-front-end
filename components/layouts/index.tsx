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
import FetchData from '../fetchData';
import store from '@/store/index';
  import { useMediaQuery } from 'react-responsive';
  import BottomNavbar from '../BottomNave';
type Props = { children: React.ReactNode };

export function Layout({ children }: Props) {
      const md = useMediaQuery({ query: '(max-width: 576px)' });
  return (
    <Provider store={store}>
      <NextNProgress height={7} />
      <FetchData />
      <Header />
      <main>{children}</main>
      {!md&&
      <Footer />
}
      <ToastContainer autoClose={200} hideProgressBar position="top-right" />
      {md&&
      <BottomNavbar/>
}
    </Provider>
  );
}
