import React from 'react';

import { ReactComponent as Spinner } from '@/assets/Spinner.svg';

export type LoadingProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

function Loading({ isLoading, children }: LoadingProps) {
  return isLoading ? (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  ) : (
    <>{children}</>
  );
}

export default Loading;
