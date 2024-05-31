'use client';

import { ReactNode } from 'react';

import classes from './main-layout.module.scss';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div id="mainLayout" className={classes.mainLayout}>
      {children}
    </div>
  );
};

export default MainLayout;
