import { contactTypeLabels } from '@constants';

export enum ContactFormEnum {
  TYPE = 'type',
  LINK = 'link',
  ID = 'id'
}
export enum ContactWaysEnum {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TELEGRAM = 'telegram',
  TWITTER = 'twitter',
  LINKEDINE = 'linedine',
  WEBSITE = 'website'
}

export type SocialTypeModel = {
  value: keyof typeof ContactWaysEnum;
  label: keyof typeof contactTypeLabels;
};

export type ContactModel = {
  link: string;
  type: string;
  id: string;
};
