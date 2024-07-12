import styled from '@emotion/styled';

export const Loading = () => {
  return <LoadingSpinner>Loading...</LoadingSpinner>;
};

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 20px;
`;
