import { Layout } from 'components/layouts';
import React, {useState,useEffect} from 'react'
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
   useEffect(() => {
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker
       .register('/firebase-messaging-sw.js')
       .then((registration) => {
     console.log('Registration successful, scope is:', registration.scope);

        
       })
       .catch((err) => {
         console.error('Unable to register service worker.', err);
       });
   }
   },[])
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
