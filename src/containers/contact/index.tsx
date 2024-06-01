'use client';

import { useEffect, useState } from 'react';
import { IoIosAdd as Add } from 'react-icons/io';
import { MdEdit as Edit } from 'react-icons/md';

import { Typography } from '@ui';
import { colorPalette } from '@shared';
import { contactForm, pagesTitle } from '@constants';
import { ContactModel } from '@models';
import { getSocialsService } from '@services';
import { CatchErrorToast, eventBus } from '@helpers';

import { ContactForm, ContactItem } from './components';

import classes from './contact.module.scss';

const ContactContainer = () => {
  const [isFormCollapseOpen, setIsFormCollapseOpen] = useState<boolean>(false);
  const [formEditItem, setFormEditItem] = useState<ContactModel | null>(null);
  const [contactList, setContactList] = useState<ContactModel[]>([]);
  const [isContactFinalList, setIsContactFinalList] = useState<boolean>(false);

  const handleGetSocials = async () => {
    try {
      const response = await getSocialsService();

      if (response) {
        setContactList(response);
        setIsContactFinalList(true);
      }
    } catch (error) {
      CatchErrorToast(error);
    }
  };

  const handleUpdateContactList = () => {
    handleGetSocials();
  };

  const handleEditItem = (item: ContactModel) => {
    setIsFormCollapseOpen(true);
    setFormEditItem(item);
  };

  const handleCloseContactForm = () => {
    setIsFormCollapseOpen(false);
    setFormEditItem(null);
  };

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

  useEffect(() => {
    handleGetSocials();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pageTitleWrapper}>
        <Typography variant="title_medium_medium" color={colorPalette.content_main_primary}>
          {pagesTitle.profile}
        </Typography>

        <Typography variant="label_small_regular" color={colorPalette.content_main_primary}>
          {`${pagesTitle.home} • ${pagesTitle.user} • `}
          <Typography variant="label_small_regular" color={colorPalette.content_main_secondary}>
            {pagesTitle.setting}
          </Typography>
        </Typography>
      </div>

      <div className={classes.contentWrapper}>
        <Typography variant="label_small_regular" color={colorPalette.content_main_secondary}>
          {contactForm.title}
        </Typography>

        <Typography
          sx={{ display: 'flex', gap: '4px', alignItems: 'center', cursor: 'pointer' }}
          variant="label_small_regular"
          color={colorPalette.content_main_brand}
          onClick={() => setIsFormCollapseOpen(true)}
        >
          {formEditItem ? <Edit size={15} /> : <Add size={20} />}

          {formEditItem ? contactForm.editContact : contactForm.newContact}
        </Typography>

        {isContactFinalList && (
          <ContactForm
            open={isFormCollapseOpen}
            onClose={handleCloseContactForm}
            initialContactList={contactList}
            updateContactList={handleUpdateContactList}
            editValues={formEditItem}
            resetEditItem={() => setFormEditItem(null)}
          />
        )}

        {!!contactList.length && (
          <div className={classes.itemsWrapper}>
            {contactList.map((item) => (
              <ContactItem key={item.id} contactItem={item} editItem={() => handleEditItem(item)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactContainer;
