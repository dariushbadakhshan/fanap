import { Fragment, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Typography } from '@ui';
import { ContactModel, ContactWaysEnum } from '@models';
import { contactForm } from '@constants';
import { colorPalette } from '@shared';

import DeleteModal from '../DeleteModal';
import SocialIcons from '../socialIcons';

import classes from './contact-item.module.scss';

type ContactItemProps = {
  contactItem: ContactModel;
  deleteItem: (id: string) => void;
};

const ContactItem = ({ contactItem, deleteItem }: ContactItemProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteItem = (id: string) => {
    deleteItem(id);
  };

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.detailsWrapper}>
          <Typography
            sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
            variant="label_small_regular"
            color={colorPalette.content_main_primary}
          >
            <SocialIcons
              label={contactItem.type as ContactWaysEnum}
              size="15"
              color={colorPalette.content_main_primary}
            />
            {contactItem.type}
          </Typography>
          <Typography variant="label_small_regular" color={colorPalette.content_main_secondary}>
            {contactForm.id}:{' '}
            <Typography variant="label_small_regular" color={colorPalette.content_main_primary}>
              {contactItem.id}
            </Typography>
          </Typography>
          <Typography variant="label_small_regular" color={colorPalette.content_main_secondary}>
            {contactForm.link}:{' '}
            <Typography variant="label_small_regular" color={colorPalette.content_main_brand}>
              {contactItem.link}
            </Typography>
          </Typography>
        </div>

        <div className={classes.actionsWrapper}>
          <Button
            startIcon={<MdEdit size={15} color={colorPalette.content_main_brand} />}
            size="small"
            variant="text"
            color="primary"
          >
            {contactForm.edit}
          </Button>
          <Button
            startIcon={<FaTrashAlt size={15} color={colorPalette.content_conditional_negative} />}
            size="small"
            variant="text"
            color="error"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            {contactForm.delete}
          </Button>
        </div>
      </div>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        contactId={contactItem.id}
        deleteItem={handleDeleteItem}
      />
    </Fragment>
  );
};

export default ContactItem;
