import '../shared/styles/global.scss';

import NextTopLoader from 'nextjs-toploader';

import { fontsHelper } from '@helpers';
import { colorPalette } from '@shared';

import ThemeRegistry from './theme-registry';

export const metadata = {
  title: 'خانه',
  description: 'fanap'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={fontsHelper.className}>
      <head>
        <link rel="shortcut icon" href="/images/svg/logo-min.svg" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body className={fontsHelper.className} suppressHydrationWarning={true}>
        <ThemeRegistry options={{ key: 'fanap' }}>
          <NextTopLoader shadow="" color={colorPalette.surface_main_brand} zIndex={1600} />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
