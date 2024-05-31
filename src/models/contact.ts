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
  LINKEDINE = 'linkedine',
  WEBSITE = 'website'
}

export type ContactModel = {
  key: string;
  link: string;
  type: string;
  id: string;
};
