import { Layout } from 'components/layouts';
import type { AppProps } from 'next/app';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div id="react-modals" />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
