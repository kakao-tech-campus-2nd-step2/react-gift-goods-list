import { keyframes as createKeyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = createKeyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SpinnerCircle = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1s linear infinite;
`;

export const Loader = () => (
  <SpinnerContainer>
    <SpinnerCircle />
  </SpinnerContainer>
);
