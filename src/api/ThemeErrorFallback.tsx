import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { RENDER_ERROR_MESSAGES } from '@/constants/errorMessage';
import ROUTES from '@/constants/routes';

type ErrorFallbackProps = {
  error: AxiosError;
};

export const ThemeErrorFallback = ({ error }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error.message === RENDER_ERROR_MESSAGES.THEME_NOT_FOUND) {
      navigate(ROUTES.HOME);
    }
  }, [error.message, navigate]);

  return <div>error page</div>;
};
