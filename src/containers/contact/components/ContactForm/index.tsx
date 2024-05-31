'use client';

import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@ui';
import { contactForm, contactFormsTexts, socialType } from '@constants';
import { ContactFormEnum, ContactWaysEnum } from '@models';
import { colorPalette, urlRegex } from '@shared';
import { FormTextInput } from '@components';

import SocialIcons from '../socialIcons';

import classes from './contact-form.module.scss';

const formSchema = z.object({
  type: z.string().min(1, contactFormsTexts.type),
  link: z
    .string()
    .min(1, contactFormsTexts.link)
    .regex(urlRegex, { message: contactFormsTexts.wrongUrl }),
  id: z.string().min(1, contactFormsTexts.id)
});

type formFields = z.infer<typeof formSchema>;

const initialValues: formFields = {
  type: '',
  link: '',
  id: ''
};

type ContactFormProps = {
  open: boolean;
  onClose: () => void;
  initialContactList: formFields[];
  updateContactList: (value: formFields) => void;
};

const ContactForm = ({
  open,
  onClose,
  initialContactList,
  updateContactList
}: ContactFormProps) => {
  const [contactList, setContactList] = useState<formFields[]>(initialContactList);

  const form = useForm<formFields>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  });

  const watchType = useWatch({
    control: form.control,
    name: 'type'
  });

  const handelSubmitForm = (values: formFields) => {
    if (contactList?.find((item) => item.link === values.link)) {
      form.setError('link', { type: 'custom', message: contactFormsTexts.duplicateLink });
      return;
    }

    if (contactList?.find((item) => item.id === values.id)) {
      form.setError('id', { type: 'custom', message: contactFormsTexts.duplicateId });
      return;
    }

    updateContactList(values);
    setContactList((prev) => [values, ...prev]);
    form.reset();
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  const animate = {
    transition: { type: 'tween' },
    height: open ? 'auto' : 0
  };

  return (
    <motion.div
      style={{ overflow: 'hidden' }}
      initial={{ height: 0, opacity: 1 }}
      animate={animate}
      exit={{ height: 0, opacity: 1 }}
    >
      <form className={classes.formWrapper}>
        <div className={classes.inputsWraper}>
          <FormTextInput
            id={ContactFormEnum.TYPE}
            name={ContactFormEnum.TYPE}
            label={`${contactForm.type}*`}
            control={form.control}
            startAdornment={
              <SocialIcons
                label={watchType as ContactWaysEnum}
                size="15"
                color={colorPalette.content_main_primary}
              />
            }
            select
          >
            {socialType.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </FormTextInput>
          <FormTextInput
            id={ContactFormEnum.LINK}
            name={ContactFormEnum.LINK}
            label={contactForm.link}
            control={form.control}
          />
          <FormTextInput
            id={ContactFormEnum.ID}
            name={ContactFormEnum.ID}
            label={contactForm.id}
            control={form.control}
          />
        </div>

        <div className={classes.buttonsWrapper}>
          <Button onClick={handleCancel} variant="outlined" size="medium">
            {contactForm.cancel}
          </Button>
          <Button onClick={form.handleSubmit(handelSubmitForm)} size="medium">
            {contactForm.submit}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
