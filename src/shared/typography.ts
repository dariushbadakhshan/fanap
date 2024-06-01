'use client';
import { createTheme } from '@mui/material';

const theme = createTheme();
// typography titles are contractions from: Name + Size + Weight : lmr=label+large+regular
export const typography = {
  fontFamily: 'IRANSans',

  // tmm
  title_medium_medium: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px'
  },

  // lmm
  label_medium_medium: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px'
  },

  // lsr
  label_small_regular: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '18px'
  },

  // blr
  body_large_regular: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px'
  },

  // bsr
  body_small_regular: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '18px'
  },

  button: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0%'
  }
};
