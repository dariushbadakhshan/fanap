import { ReactNode } from 'react';
import { Modal as MuiModal } from '@mui/material';

import { Typography } from '@ui';
import { colorPalette } from '@shared';

import classes from './modal.module.scss';

type ModalProps = {
  title?: string;
  content?: ReactNode;
  actions?: ReactNode;
  open: boolean;
  onClose?: () => void;
};

const Modal = ({ title, content, open, actions, onClose }: ModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classes.wrapper}>
        <Typography variant="label_medium_medium" color={colorPalette.content_main_primary}>
          {title}
        </Typography>

        {content}

        {actions}
      </div>
    </MuiModal>
  );
};

export default Modal;
