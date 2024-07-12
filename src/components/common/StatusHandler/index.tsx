import React, { ReactNode } from 'react';
import { ERROR } from '@utils/constants/message';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

interface StatusHanlderProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  children: ReactNode;
}

export default function StatusHandler({ isLoading, isError, isEmpty, children }: StatusHanlderProps) {
  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={ERROR.DATA_FETCH} />;
  if (isEmpty) return <ErrorMessage message={ERROR.NO_PRODUCTS} />;

  return <div>{children}</div>;
}
