import { ContactWaysEnum } from '@models';
import { contactTypeLabels } from '@constants';

export const renderTypes = (value: string) => {
  switch (value) {
    case ContactWaysEnum.INSTAGRAM:
      return contactTypeLabels.instagram;

    case ContactWaysEnum.FACEBOOK:
      return contactTypeLabels.facebook;
    case ContactWaysEnum.TELEGRAM:
      return contactTypeLabels.telegram;

    case ContactWaysEnum.TWITTER:
      return contactTypeLabels.twitter;

    case ContactWaysEnum.LINKEDINE:
      return contactTypeLabels.linkedine;

    case ContactWaysEnum.WEBSITE:
      return contactTypeLabels.website;

    default:
      return;
  }
};
