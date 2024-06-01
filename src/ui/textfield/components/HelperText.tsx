import { ReactNode } from 'react';
import Box from '@mui/material/Box';

import { Typography } from '../../typography';
import { colorPalette } from '@shared';

interface HelperTextProps {
  helperText?: ReactNode;
  error?: string;
  characterLimit?: number;
  value?: string;
}
const HelperText = ({
  error,
  helperText,
  characterLimit,
  value,
}: HelperTextProps): JSX.Element => {
  return (
    <Box
      sx={{ direction: 'ltr' }}
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        {error && (
          <Typography component="p" variant="body_small_regular">
            {error}
          </Typography>
        )}
        {helperText && (
          <Typography
            component="p"
            variant="body_small_regular"
            color={colorPalette.content_main_secondary}
          >
            {helperText}
          </Typography>
        )}
      </Box>

      {characterLimit && (
        <Typography variant="body_small_regular">
          {value?.length}/{characterLimit}
        </Typography>
      )}
    </Box>
  );
};

export default HelperText;
