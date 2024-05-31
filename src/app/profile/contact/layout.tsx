import { ReactNode } from 'react';

import { MainLayout } from '@components';
import { pagesTitle } from '@constants';

export const metadata = {
  title: pagesTitle.profile,
  description: 'fanap'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
