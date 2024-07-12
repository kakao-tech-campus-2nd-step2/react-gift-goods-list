import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #22a6b3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export default Loading;