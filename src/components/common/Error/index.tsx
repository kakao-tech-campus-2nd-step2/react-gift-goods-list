import styled from '@emotion/styled';
import React from 'react';

type ErrorProps = {
  children: React.ReactNode;
};

export const Error: React.FC<ErrorProps> = ({ children }) => {
  return <ErrorMessage>{children}</ErrorMessage>;
};

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;

export default Error;
