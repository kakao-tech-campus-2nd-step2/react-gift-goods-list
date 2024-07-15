import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const LoadingIcon = () => {
  return <Loading />;
};
const Spin = keyframes`
  0%{
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
`;
const Loading = styled.div`
  width: 30px;
  height: 30px;
  margin: 30px auto;
  border-radius: 100%;
  border: 5px solid transparent;
  border-top: 5px solid rgb(153, 153, 153);
  animation: ${Spin} 1.5s linear infinite;
`;