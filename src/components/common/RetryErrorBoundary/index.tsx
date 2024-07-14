import styled from '@emotion/styled';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '../Button';

const RetryErrorBoundary = ({ children }: PropsWithChildren<unknown>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
        <Wrapper>
          <h2>😭에러가 발생했습니다😭</h2>
          <h4 style={{ color: 'red' }}> {error.message} </h4>
          <Button
            theme="kakao"
            onClick={() => resetErrorBoundary()}
            style={{ width: '100px', margin: '16px 0' }}
          >
            다시 시도하기
          </Button>
        </Wrapper>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  h4: {
    margin: '8px 0',
  },
});

export default RetryErrorBoundary;
