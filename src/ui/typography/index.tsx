import MuiTypography, { TypographyProps } from '@mui/material/Typography';

export type CustomTypographyVarients =
  | 'title_medium_medium'
  | 'label_medium_medium'
  | 'label_small_regular'
  | 'body_large_regular'
  | 'body_small_regular';

enum TypographyEnum {
  tmm = 'title_medium_medium',
  lmm = 'label_medium_medium',
  lsr = 'label_small_regular',
  blr = 'body_large_regular',
  bsr = 'body_small_regular'
}

export interface CustomTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant?: CustomTypographyVarients;
}

export function Typography({ variant = 'body_large_regular', ...rest }: CustomTypographyProps) {
  return <MuiTypography variant={variant as keyof typeof TypographyEnum} {...rest} />;
}

export default Typography;
