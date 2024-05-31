import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, Typography } from '@ui';
import { contactForm, deleteContactTexts } from '@constants';
import { colorPalette } from '@shared';
import { FormTextInput, Modal } from '@components';
import { ContactModel } from '@models';
import { deleteSocialsService } from '@services';
import { eventBus, CatchErrorToast } from '@helpers';

import classes from './delete-modal.module.scss';

const formSchema = z.object({
  confirm: z.string().min(1, deleteContactTexts.error)
});

type formFields = z.infer<typeof formSchema>;

type DeleteModalProps = {
  contactItem: ContactModel;
  open: boolean;
  onClose: () => void;
};

const DeleteModal = ({ contactItem, open, onClose }: DeleteModalProps) => {
  const router = useRouter();
  const form = useForm<formFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { confirm: '' }
  });

  const handleDeleteSocials = async (id: string) => {
    try {
      await deleteSocialsService(id);
      eventBus.next({
        type: 'deleteItem'
      });
    } catch (error) {
      CatchErrorToast(error);
    }
  };

  const handleSubmitForm = (values: formFields) => {
    if (values.confirm !== contactForm.accept) {
      form.setError('confirm', { message: deleteContactTexts.error });
      return;
    }
    handleDeleteSocials(contactItem.id);
  };

  const handleCancelDelete = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={deleteContactTexts.title}
      content={
        <div className={classes.contentWrapper}>
          <Typography variant="label_small_regular" color={colorPalette.content_main_secondary}>
            {`برای حذف مسیر ارتباطی ${contactItem.id} لطفا تایید را بنویسید`}
          </Typography>

          <FormTextInput
            id={'confirm'}
            name={'confirm'}
            label={contactForm.accept}
            control={form.control}
          />
        </div>
      }
      actions={
        <div className={classes.actionsWrapper}>
          <Button size="small" variant="text" color="primary" onClick={handleCancelDelete}>
            {contactForm.cancel}
          </Button>
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={form.handleSubmit(handleSubmitForm)}
          >
            {contactForm.delete}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteModal;
