'use client';

import 'react-toastify/dist/ReactToastify.css';

import { ToastOptions, toast as showToast } from 'react-toastify';
import { IoIosClose as CloseIcon } from 'react-icons/io';
import { AiOutlineInfoCircle as InfoCircle } from 'react-icons/ai';

import { fontsHelper } from '@helpers';
import { colorPalette } from '@shared';

import classes from './toast.module.scss';

const options: ToastOptions<object> = {
  position: 'bottom-center',
  className: classes.toastWrapper,
  rtl: true,
  style: {
    fontFamily: fontsHelper.style.fontFamily
  },
  hideProgressBar: true,
  theme: 'dark',
  autoClose: 5000,
  draggable: true,
  closeButton: <CloseIcon />
};

const Toast = {
  success: (message: string) => {
    showToast.success(message, {
      ...options,
      icon: <InfoCircle size={18} color={colorPalette.content_conditional_positive} />
    });
  },
  error: (message: string) => {
    showToast.error(message, {
      ...options,
      icon: <InfoCircle size={18} color={colorPalette.content_conditional_negative} />
    });
  },
  info: (message: string) => {
    showToast.info(message, {
      ...options,
      icon: <InfoCircle size={18} color={colorPalette.surface_main} />
    });
  },
  warn: (message: string) => {
    showToast.warn(message, {
      ...options,
      icon: <InfoCircle size={18} color={colorPalette.content_conditional_warning} />
    });
  }
};

export { Toast };
