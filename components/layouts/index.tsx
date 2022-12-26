import Head from 'next/head';

import Header from '../Header';

type Props = { children: React.ReactNode };

export function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <Header />

      <main className="flex-grow  md:mt-40">{children}</main>
    </>
  );
}
export default Layout;
