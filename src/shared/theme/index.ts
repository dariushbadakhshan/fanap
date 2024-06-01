'use client';

import React from 'react';

import { darkColorPalette, lightColorPalette } from '../colorPalette';

export const lightThemePalette = {
  primary: {
    main: lightColorPalette.surface_main_brand,
    contrastText: lightColorPalette.surface_main
  },
  secondary: {
    main: lightColorPalette.surface_main_secondary
  },
  error: {
    main: lightColorPalette.surface_conditional_negative
  },
  sunset: {
    main: lightColorPalette.surface_main_brand,
    contrastText: '#fff'
  },
  ...lightColorPalette
};

export const darkThemePalette = {
  primary: {
    main: darkColorPalette.surface_main_brand,
    contrastText: darkColorPalette.surface_main
  },
  secondary: {
    main: darkColorPalette.surface_main_secondary
  },
  error: {
    main: darkColorPalette.surface_conditional_negative
  },
  sunset: {
    main: darkColorPalette.surface_main_brand,
    contrastText: '#fff'
  },
  ...darkColorPalette
};

declare module '@mui/material/styles' {
  interface Palette {
    sunset: Palette['primary'];
    leaf: Palette['primary'];
    zarin: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    sunset?: PaletteOptions['primary'];
    leaf?: PaletteOptions['primary'];
    zarin?: PaletteOptions['primary'];
  }

  interface TypographyVariants {
    tlm?: React.CSSProperties;
    tmm?: React.CSSProperties;
    lmr?: React.CSSProperties;
    lmm?: React.CSSProperties;
    lsr?: React.CSSProperties;
    blr?: React.CSSProperties;
    bmr?: React.CSSProperties;
    bsm?: React.CSSProperties;
    bsr?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tlm?: React.CSSProperties;
    tmm?: React.CSSProperties;
    lmr?: React.CSSProperties;
    lmm?: React.CSSProperties;
    lsr?: React.CSSProperties;
    blr?: React.CSSProperties;
    bmr?: React.CSSProperties;
    bsm?: React.CSSProperties;
    bsr?: React.CSSProperties;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    sunset: true;
    leaf: true;
    zarin: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tlm?: true;
    tmm?: true;
    lmr?: true;
    lmm?: true;
    lsr?: true;
    blr?: true;
    bmr?: true;
    bsm?: true;
    bsr?: true;
  }
}
