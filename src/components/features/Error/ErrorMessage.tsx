import styled from '@emotion/styled';

const StyledErrorMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
`;

export const ErrorMessage = ({ message }: { message: string }) => {
  return <StyledErrorMessage>{message}</StyledErrorMessage>;
};
