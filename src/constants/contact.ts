import { ContactWaysEnum } from '@models';

export const contactForm = {
  title: 'مسیرهای ارتباطی',
  newContact: 'افزودن مسبر ارتباطی',
  editContact: 'ویرایش مسبر ارتباطی',
  type: 'نوع',
  link: 'لینک',
  id: 'آی دی (ID)',
  cancel: 'انصراف',
  submit: 'ثبت مسیر ارتباطی',
  edit: 'ویرایش',
  delete: 'حذف',
  accept: 'تایید'
};

export const contactTypeLabels = {
  instagram: 'اینستاگرام',
  facebook: 'فیسبوک',
  telegram: 'تلگرام',
  twitter: 'توئیتر',
  linkedine: 'لینکداین',
  website: 'وبسایت'
};

export const socialType = [
  {
    value: ContactWaysEnum.INSTAGRAM,
    label: contactTypeLabels.instagram
  },
  {
    value: ContactWaysEnum.FACEBOOK,
    label: contactTypeLabels.facebook
  },
  {
    value: ContactWaysEnum.TELEGRAM,
    label: contactTypeLabels.telegram
  },
  {
    value: ContactWaysEnum.TWITTER,
    label: contactTypeLabels.twitter
  },
  {
    value: ContactWaysEnum.LINKEDINE,
    label: contactTypeLabels.linkedine
  },
  {
    value: ContactWaysEnum.WEBSITE,
    label: contactTypeLabels.website
  }
];

export const contactFormsTexts = {
  type: 'لطفا یک مورد را انتخاب کنید.',
  link: 'لطفا لینک را وارد نمایید.',
  id: 'لطفا آی دی (ID) را وارد نمایید.',
  duplicateLink: 'لینک وارد شده نمیتواند تکراری باشد.',
  duplicateId: 'آی دی (ID) وارد شده نمیتواند تکراری باشد.',
  wrongUrl: 'لطفا آدرس لینک را به صورت صحیح وارد کنید'
};

export const deleteContactTexts = {
  title: 'آیا از تصمیم خود مطمئن هستید؟',
  error: 'لطفا جهت حذف تایید را بنویسید'
};
