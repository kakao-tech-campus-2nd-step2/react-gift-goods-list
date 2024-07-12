import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import loadingGif from '@/assets/loading.gif';

interface DataWrapperProps {
  isLoading: boolean;
  errorMessage: string | null;
  children: ReactNode;
}

export const DataWrapper = ({ isLoading, errorMessage, children }: DataWrapperProps) => {
  if (isLoading) {
    return <Loader src={loadingGif} alt="Loading..." />;
  }

  if (errorMessage) {
    return <Message>{errorMessage}</Message>;
  }

  return <>{children}</>;
};

const Loader = styled.img`
  display: block;
  margin: 0 auto;
  }
`;

const Message = styled.p`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
