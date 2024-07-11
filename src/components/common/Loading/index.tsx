import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const LoadingSpinner: React.FC = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
};

export default LoadingSpinner;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  content-justify: center;
`
