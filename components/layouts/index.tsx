import { Fragment } from 'react';
import { Header } from '../header';

type Props = { children: React.ReactNode };

export const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
};
