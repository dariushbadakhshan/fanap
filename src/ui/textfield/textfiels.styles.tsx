import { colorPalette } from '@shared';

export const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    height: '45px',
    color: colorPalette.content_main_primary,

    '& fieldset': {
      borderColor: colorPalette.content_main_secondary
    },

    '&:hover fieldset': {
      borderColor: colorPalette.content_main_primary
    },
    '&.Mui-focused fieldset': {
      borderColor: colorPalette.border_main_brand
    }
  },

  '& .MuiFormLabel-root': {
    color: colorPalette.content_main_secondary,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    top: '-5px'
  },

  '& .MuiInputBase-input': {
    fontSize: '14px'
  },

  '& .MuiSvgIcon-root': {
    color: colorPalette.content_main_secondary
  }
};
