'use client';

import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import { Typography } from '@ui';
import { colorPalette } from '@shared';
import { contactForm, pagesTitle } from '@constants';
import { ContactModel } from '@models';

import { ContactForm, ContactItem } from './components';

import classes from './contact.module.scss';

const ContactContainer = () => {
  const [isFormCollapseOpen, setIsFormCollapseOpen] = useState<boolean>(false);
  const [contactList, setContactList] = useState<ContactModel[]>([]);

  const handleUpdateContactList = (value: ContactModel) => {
    setContactList((prev) => [value, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setContactList((prev) => {
      const filterItems = prev.filter((item) => item.id !== id);

      return filterItems;
    });
  };

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
          <IoIosAdd size={20} />

          {contactForm.newContact}
        </Typography>

        <ContactForm
          open={isFormCollapseOpen}
          onClose={() => setIsFormCollapseOpen(false)}
          initialContactList={contactList}
          updateContactList={handleUpdateContactList}
        />

        {!!contactList.length && (
          <div className={classes.itemsWrapper}>
            {contactList.map((item) => (
              <ContactItem key={item.id} contactItem={item} deleteItem={handleDeleteItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactContainer;
