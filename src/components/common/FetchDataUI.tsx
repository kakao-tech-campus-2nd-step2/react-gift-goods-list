import styled from '@emotion/styled';
import React from 'react';

interface FetchDataUIProps<T> {
  loading: boolean;
  error: string | null;
  data: T[];
  children: React.ReactNode;
}

export const FetchDataUI = <T,>({ loading, error, data, children }: FetchDataUIProps<T>) => {
  if (loading) {
    return <LoadingMsg>Loading...</LoadingMsg>;
  }

  if (error) {
    return <ErrorMsg>{error}</ErrorMsg>;
  }

  if (data.length === 0) {
    return <NoDataMsg>보여줄 상품이 없어요!</NoDataMsg>;
  }

  return <>{children}</>;
};

const LoadingMsg = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #007bff;
`;

const ErrorMsg = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: red;
`;

const NoDataMsg = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #007bff;
`;
