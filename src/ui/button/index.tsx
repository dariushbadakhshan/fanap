'use client';

import MuiButton, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { buttonStyles } from './button.styles';

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  isLoading?: boolean;
  size?: 'small' | 'medium';
  variant?: 'contained' | 'text' | 'outlined';
}

export const Button = ({
  children,
  isLoading = false,
  disabled,
  color = 'primary',
  variant = 'contained',
  size = 'medium',
  sx,
  ...rest
}: CustomButtonProps) => {
  return (
    <MuiButton
      sx={{
        ...buttonStyles,
        ...sx
      }}
      variant={variant}
      color={color}
      disabled={isLoading || disabled}
      size={size}
      {...rest}
    >
      {isLoading ? <CircularProgress color="inherit" /> : children}
    </MuiButton>
  );
};
