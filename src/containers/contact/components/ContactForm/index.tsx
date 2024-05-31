'use client';

import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, Typography } from '@ui';
import { contactForm, contactFormsTexts, socialType } from '@constants';
import { ContactFormEnum, ContactModel, ContactWaysEnum, SocialParamsDataModel } from '@models';
import { colorPalette, urlRegex } from '@shared';
import { FormTextInput } from '@components';
import { createSocialsService, getSocialsService, updateSocialsService } from '@services';
import { CatchErrorToast, eventBus } from '@helpers';

import SocialIcons from '../socialIcons';
import { renderTypes } from '../renderTypes';

import classes from './contact-form.module.scss';

const formSchema = z.object({
  social_type: z.string().min(1, contactFormsTexts.type),
  social_link: z
    .string()
    .min(1, contactFormsTexts.link)
    .regex(urlRegex, { message: contactFormsTexts.wrongUrl }),
  social_id: z.string().min(1, contactFormsTexts.id)
});

type formFields = z.infer<typeof formSchema>;

const initialValues: formFields = {
  social_link: '',
  social_type: '',
  social_id: ''
};

type ContactFormProps = {
  open: boolean;
  onClose: () => void;
  initialContactList: ContactModel[];
  updateContactList: () => void;
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
    name: 'social_type'
  });

  const handleGetSocials = async () => {
    try {
      const response = await getSocialsService();

      if (response) {
        setContactList(response);
      }
    } catch (error) {
      CatchErrorToast(error);
    }
  };

  const handleCreateSocials = async (requestBody: SocialParamsDataModel) => {
    try {
      const response = await createSocialsService(requestBody);
      if (response) {
        handleGetSocials();
      }
    } catch (error) {
      CatchErrorToast(error);
    }
  };

  const handleUpdateSocials = async (requestBody: SocialParamsDataModel) => {
    try {
      if (editValues) {
        const response = await updateSocialsService(editValues?.id, requestBody);
        if (response) {
          handleGetSocials();
        }
      }
    } catch (error) {
      CatchErrorToast(error);
    }
  };

  const handelSubmitForm = (values: formFields) => {
    if (!editValues && contactList?.find((item) => item.social_link === values.social_link)) {
      form.setError('social_link', { type: 'custom', message: contactFormsTexts.duplicateLink });
      return;
    }

    if (!editValues && contactList?.find((item) => item.social_id === values.social_id)) {
      form.setError('social_id', { type: 'custom', message: contactFormsTexts.duplicateId });
      return;
    }

    if (editValues) {
      handleUpdateSocials(values);
      form.reset();
      resetEditItem();
      updateContactList();
    } else {
      handleCreateSocials(values);
      form.reset();
      updateContactList();
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

  useEffect(() => {
    const subscription = eventBus.subscribe((event) => {
      if (event && event?.type === 'deleteItem') {
        handleGetSocials();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
            ? `${contactForm.editContact} ${renderTypes(editValues.social_type)}`
            : contactForm.newContact}
        </Typography>

        <div className={classes.inputsWraper}>
          <FormTextInput
            id={ContactFormEnum.SOCIALTYPE}
            name={ContactFormEnum.SOCIALTYPE}
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
            id={ContactFormEnum.SOCIALLINK}
            name={ContactFormEnum.SOCIALLINK}
            label={contactForm.link}
            control={form.control}
          />
          <FormTextInput
            id={ContactFormEnum.SOCIALID}
            name={ContactFormEnum.SOCIALID}
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
              ? `${contactForm.editContact} ${renderTypes(editValues.social_type)}`
              : contactForm.submit}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
