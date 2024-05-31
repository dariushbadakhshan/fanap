'use client';
/* eslint-disable no-unused-vars */
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { InputAdornment } from '@mui/material';
import MuiTextField, { BaseTextFieldProps } from '@mui/material/TextField';
import cn from 'clsx';

import HelperText from './components/HelperText';

import { textFieldStyles } from './textfiels.styles';

export interface CustomTextFieldProps extends Omit<BaseTextFieldProps, 'error'> {
  error?: string;
  className?: string;
  onChange?: (
    /* eslint-disable @typescript-eslint/no-explicit-any */
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
    shouldClear?: boolean,
    name?: string
  ) => void;
  dir?: string;
  select?: boolean;
  children?: ReactNode;
}

export const TextField = ({
  error,
  label,
  startAdornment,
  helperText,
  onChange,
  align = 'right',
  InputProps,
  name,
  value,
  sx,
  dir,
  select,
  children
}: any) => {
  const [textfieldValue, setTextfieldValue] = useState<string | any>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldValue = event.target.value;

    setTextfieldValue(fieldValue);
    onChange && onChange(event);
  };

  useEffect(() => {
    // Update the value whenever the 'value' prop changes
    setTextfieldValue(value || '');
  }, [value]);

  return (
    <MuiTextField
      sx={{
        ...textFieldStyles,
        ...sx
      }}
      dir={dir}
      className={cn(`${align}_align_input`)}
      classes={{ root: !label ? 'withoutLabel' : '' }}
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={textfieldValue}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment sx={{ mr: 2 }} position="start">
            {startAdornment}
          </InputAdornment>
        ) : null,

        ...InputProps
      }}
      error={error ? true : false}
      FormHelperTextProps={{
        component: 'div'
      }}
      helperText={
        (error || helperText) && (
          <HelperText helperText={helperText} error={error} value={textfieldValue} />
        )
      }
      onChange={handleChange}
      select={select}
    >
      {children}
    </MuiTextField>
  );
};
