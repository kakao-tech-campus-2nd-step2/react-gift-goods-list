import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface FetchDataUIProps<T> {
  loading: boolean;
  error: string | null;
  data: T[];
  children: React.ReactNode;
}

export const FetchDataUI = <T,>({
  loading = false,
  error = null,
  data = [],
  children,
}: FetchDataUIProps<T>) => {
  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <ErrorMsg>{error}</ErrorMsg>;
  }

  if (data.length === 0) {
    return <NoDataMsg>보여줄 상품이 없어요!</NoDataMsg>;
  }

  return <>{children}</>;
};

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #d2d2d2;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

const ErrorMsg = styled.div`
  text-align: center;
  padding: 20px;
`;

const NoDataMsg = styled.div`
  text-align: center;
  padding: 20px;
`;
