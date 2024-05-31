'use client';

import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, Typography } from '@ui';
import { contactForm, contactFormsTexts, socialType } from '@constants';
import { ContactFormEnum, ContactModel, ContactWaysEnum } from '@models';
import { colorPalette, urlRegex } from '@shared';
import { FormTextInput } from '@components';
import { useUuid } from '@hooks';

import SocialIcons from '../socialIcons';
import { renderTypes } from '../renderTypes';

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
  initialContactList: ContactModel[];
  updateContactList: (value: ContactModel) => void;
  editValues: ContactModel | null;
  resetEditItem: () => void;
};

const ContactForm = ({
  open,
  onClose,
  initialContactList,
  updateContactList,
  editValues,
  resetEditItem
}: ContactFormProps) => {
  const [contactList, setContactList] = useState<ContactModel[]>(initialContactList);

  const form = useForm<formFields>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  });

  const watchType = useWatch({
    control: form.control,
    name: 'type'
  });

  const uniqId = useUuid();

  const handelSubmitForm = (values: formFields) => {
    if (!editValues && contactList?.find((item) => item.link === values.link)) {
      form.setError('link', { type: 'custom', message: contactFormsTexts.duplicateLink });
      return;
    }

    if (!editValues && contactList?.find((item) => item.id === values.id)) {
      form.setError('id', { type: 'custom', message: contactFormsTexts.duplicateId });
      return;
    }

    if (editValues) {
      setContactList((prev) => {
        const remainigItems: ContactModel[] = prev.filter((item) => item.key !== editValues.key);

        return [{ ...values, key: editValues.key }, ...remainigItems];
      });
      updateContactList({ ...values, key: editValues.key });
      form.reset();
      resetEditItem();
    } else {
      updateContactList({ ...values, key: uniqId });
      setContactList((prev) => [{ ...values, key: uniqId }, ...prev]);
      form.reset();
    }
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (editValues) {
      for (const [key, value] of Object.entries<string>(editValues)) {
        form.setValue(key as keyof formFields, value);
      }
    }
  }, [editValues]);

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
        <Typography variant="label_medium_medium" color={colorPalette.content_main_primary}>
          {editValues
            ? `${contactForm.editContact} ${renderTypes(editValues.type)}`
            : contactForm.newContact}
        </Typography>

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
            {editValues
              ? `${contactForm.editContact} ${renderTypes(editValues.type)}`
              : contactForm.submit}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
