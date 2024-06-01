export interface ColorPalette {
  [key: string]: string;
  surface_main: string;
  surface_main_background: string;
  surface_main_secondary: string;
  surface_main_brand: string;
  surface_main_brand_light: string;
  surface_conditional_negative: string;
  surface_overlay_100: string;

  content_main_primary: string;
  content_main_secondary: string;
  content_main_tertiary: string;
  content_main_brand: string;
  content_conditional_negative: string;
  content_conditional_positive: string;
  content_conditional_disable: string;

  border_main_primary: string;
  border_main_brand: string;
  border_conditional_negative: string;
  border_conditional_disable: string;
  border_conditional_disable_light: string;
}
