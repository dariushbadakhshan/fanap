'use client';
import { useState } from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import {
  ThemeProvider,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { lightTheme, themePalette } from '@shared';
import { typography } from '@shared';
import { fontsHelper } from '@helpers';

const theme = extendTheme({
  direction: 'rtl',
  cssVarPrefix: 'fanap',
  colorSchemes: {
    light: {
      palette: {
        ...themePalette,
      },
    },
  },
  typography: {
    ...typography,
    fontFamily: fontsHelper.style.fontFamily,
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
  },
});

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ThemeRegistry(props: any) {
  const { options, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      ...options,
      stylisPlugins: [prefixer, rtlPlugin],
    });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={lightTheme}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
