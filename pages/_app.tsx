import { Layout } from 'components/layouts';
import React, {useState,useEffect} from 'react'
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import dynamic from 'next/dynamic';

const ServiceWorkerComponent = dynamic(
  () => import('./ServiceWorkerComponent'),
  {
    ssr: false,
  }
);
function MyApp({ Component, pageProps }: AppProps) {


     const [darkMode, setDarkMode] = useState(false);

     useEffect(() => {
       const prefersDarkMode = window.matchMedia(
         '(prefers-color-scheme: dark)'
       ).matches;
       setDarkMode(prefersDarkMode);
     }, []);

     useEffect(() => {
       if (darkMode) {
         document.documentElement.classList.add('dark');
       } else {
         document.documentElement.classList.remove('dark');
       }
     }, [darkMode]);
  return (
      <React.StrictMode>
        <Layout>
          <div id="react-modals" />
          <ServiceWorkerComponent/>
          <Provider session={pageProps.session}>
            <Component
              {...pageProps}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </Provider>
        </Layout>
      </React.StrictMode>
  );
}

export default MyApp;
