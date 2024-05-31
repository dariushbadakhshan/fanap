import { Toast } from '@components';

export const ServicesCatchError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw error; 
    
  }
};

export const CatchErrorToast = (error: unknown) => {
  const errorMessage = (error as Error)?.message;

  Toast.error(error && errorMessage ? errorMessage : 'مشکلی پیش آمده است. لطفا دوباره تلاش کنید.');
};
