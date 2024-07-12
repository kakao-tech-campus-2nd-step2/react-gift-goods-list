import React, { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { ERROR } from '@utils/constants/message';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

interface StatusHanlderProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  error?: AxiosError | null;
  children: ReactNode;
}

export default function StatusHandler({ isLoading, isError, isEmpty, error, children }: StatusHanlderProps) {
  if (isLoading) return <Spinner />;
  if (isError && error) return <ErrorMessage message={error.message} />;
  if (isEmpty) return <ErrorMessage message={ERROR.NO_PRODUCTS} />;

  return <div>{children}</div>;
}
