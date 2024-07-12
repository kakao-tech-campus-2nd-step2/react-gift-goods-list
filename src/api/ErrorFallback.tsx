import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { RENDER_ERROR_MESSAGES } from '@/constants/errorMessage';
import ROUTES from '@/constants/routes';

type ErrorFallbackProps = {
  error: AxiosError;
  resetErrorBoundary: () => void;
};

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error.message === RENDER_ERROR_MESSAGES.THEME_NOT_FOUND) {
      navigate(ROUTES.HOME);
    } else {
      resetErrorBoundary();
    }
  }, [error.message, navigate, resetErrorBoundary]);

  return <div>error page</div>;
};
