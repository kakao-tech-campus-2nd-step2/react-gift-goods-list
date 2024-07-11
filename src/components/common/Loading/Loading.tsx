/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinnerStyle = css`
  margin: 0 auto;
  border: 6px solid #ccc;
  border-top: 6px solid #1d3f72;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingSpinner = () => {
  return <div css={spinnerStyle}></div>;
};

export const LoadingMessage = () => {
  return <div>로딩 중</div>;
};
