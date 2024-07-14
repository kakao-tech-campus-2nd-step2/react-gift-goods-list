// src/api/Loading.tsx
import styled from '@emotion/styled';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
`;

export const Loading = () => (
  <LoadingWrapper>
    <Logo src="https://i.gifer.com/XOsX.gif" alt="Loading" />
  </LoadingWrapper>
);
