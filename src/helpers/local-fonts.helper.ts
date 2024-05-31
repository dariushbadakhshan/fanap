import localFont from 'next/font/local';

const iranSans = localFont({
  src: [
    {
      path: '../../public/fonts/iransansX-faNum/IRANSansXFaNum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iransansX-faNum/IRANSansXFaNum-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iransansX-faNum/IRANSansXFaNum-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default iranSans;
