import styled from '@emotion/styled';
import { TailSpin } from 'react-loader-spinner';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  color: #4684e9;
  height: 300px;
  width: 100%;
`;

export const Loading = ({ message = 'Loading...' }) => (
  <LoadingContainer>
    <div>
      <TailSpin height="80" width="80" color="#4684e9" ariaLabel="loading" />
      <p>{message}</p>
    </div>
  </LoadingContainer>
);
