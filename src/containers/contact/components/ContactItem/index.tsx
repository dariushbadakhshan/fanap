import { Fragment, useState } from 'react';
import { MdEdit as Edit } from 'react-icons/md';
import { FaTrashAlt as Trash } from 'react-icons/fa';

import { Button, Typography } from '@ui';
import { ContactModel, ContactWaysEnum } from '@models';
import { contactForm } from '@constants';
import { colorPalette } from '@shared';

import DeleteModal from '../DeleteModal';
import SocialIcons from '../socialIcons';
import { renderTypes } from '../renderTypes';

import classes from './contact-item.module.scss';

type ContactItemProps = {
  contactItem: ContactModel;
  deleteItem: (id: string) => void;
  editItem: () => void;
};

const ContactItem = ({ contactItem, deleteItem, editItem }: ContactItemProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteItem = (key: string) => {
    deleteItem(key);
  };

  const handleEditItem = () => {
    editItem();
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
            {renderTypes(contactItem.type)}
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
            startIcon={<Edit size={15} color={colorPalette.content_main_brand} />}
            size="small"
            variant="text"
            color="primary"
            onClick={handleEditItem}
          >
            {contactForm.edit}
          </Button>
          <Button
            startIcon={<Trash size={15} color={colorPalette.content_conditional_negative} />}
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
        contactItem={contactItem}
        deleteItem={handleDeleteItem}
      />
    </Fragment>
  );
};

export default ContactItem;
