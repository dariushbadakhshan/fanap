export enum ContactFormEnum {
  SOCIALTYPE = 'social_type',
  SOCIALLINK = 'social_link',
  SOCIALID = 'social_id'
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
  id: string;
  social_link: string;
  social_type: string;
  social_id: string;
};

export type SocialParamsDataModel = {
  social_type: string;
  social_id: string;
  social_link: string;
};
