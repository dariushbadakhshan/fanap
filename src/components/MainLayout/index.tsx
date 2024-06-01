'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { CiLight as LightIcon } from 'react-icons/ci';

import { colorPalette } from '@shared';
import { eventBus } from '@helpers';

import classes from './main-layout.module.scss';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const handleToggleTheme = () => {
    eventBus.next({ type: 'changeThemeMode' });
  };

  return (
    <div id="mainLayout" className={classes.mainLayout}>
      <div className={classes.themeToggle} onClick={handleToggleTheme}>
        <LightIcon size={15} color={colorPalette.content_main_primary} />
      </div>

      {children}
    </div>
  );
};

export default MainLayout;
