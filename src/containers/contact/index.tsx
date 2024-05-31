'use client';

import { useState } from 'react';
import { IoIosAdd as Add } from 'react-icons/io';
import { MdEdit as Edit } from 'react-icons/md';

import { Typography } from '@ui';
import { colorPalette } from '@shared';
import { contactForm, pagesTitle } from '@constants';
import { ContactModel } from '@models';

import { ContactForm, ContactItem } from './components';

import classes from './contact.module.scss';

const ContactContainer = () => {
  const [isFormCollapseOpen, setIsFormCollapseOpen] = useState<boolean>(false);
  const [formEditItem, setFormEditItem] = useState<ContactModel | null>(null);
  const [contactList, setContactList] = useState<ContactModel[]>([]);

  const handleUpdateContactList = (values: ContactModel) => {
    if (formEditItem) {
      setContactList((prev) => {
        const remainigItems: ContactModel[] = prev.filter((item) => item.key !== values.key);

        return [values, ...remainigItems];
      });
    } else {
      setContactList((prev) => [values, ...prev]);
    }
  };

  const handleDeleteItem = (key: string) => {
    setContactList((prev) => {
      const filterItems = prev.filter((item) => item.key !== key);

      return filterItems;
    });
  };

  const handleEditItem = (item: ContactModel) => {
    setIsFormCollapseOpen(true);
    setFormEditItem(item);
  };

  const handleCloseContactForm = () => {
    setIsFormCollapseOpen(false);
    setFormEditItem(null);
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
          {formEditItem ? <Edit size={15} /> : <Add size={20} />}

          {formEditItem ? contactForm.editContact : contactForm.newContact}
        </Typography>

        <ContactForm
          open={isFormCollapseOpen}
          onClose={handleCloseContactForm}
          initialContactList={contactList}
          updateContactList={handleUpdateContactList}
          editValues={formEditItem}
          resetEditItem={() => setFormEditItem(null)}
        />

        {!!contactList.length && (
          <div className={classes.itemsWrapper}>
            {contactList.map((item) => (
              <ContactItem
                key={item.key}
                contactItem={item}
                deleteItem={handleDeleteItem}
                editItem={() => handleEditItem(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactContainer;
