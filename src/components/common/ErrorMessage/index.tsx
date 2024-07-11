import React from 'react';
import styled from '@emotion/styled';

export interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message, ...rest }: ErrorMessageProps) {
  return <Message {...rest}>{message}</Message>;
}

const Message = styled.strong`
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  margin-top: 20px;
`;
