/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/order */
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import NextNProgress from 'nextjs-progressbar';
const Footer = dynamic(() => import('../Footer/footer'));
import { Header } from '../Header';
import store from '@/store/index';
import { AuthModal } from '../auth';
const FetchData = dynamic(() => import('../fetchData'));
const BottomNavigation = dynamic(() => import('../bottomNavigation'));
type Props = { children: React.ReactNode };
export function Layout({ children }: Props) {
  return (
    <Provider store={store}>
      <NextNProgress height={7} />
      <Header />
      <FetchData />
      <main className=" pt-2">{children}</main>
      <Footer />
      <div className="fixed bottom-0 left-0 w-full">
        <BottomNavigation />
      </div>
      <AuthModal />
      <ToastContainer autoClose={200} hideProgressBar position="top-right" />
      {/* {md&&
      <BottomNavbar/>
} */}
    </Provider>
  );
}
