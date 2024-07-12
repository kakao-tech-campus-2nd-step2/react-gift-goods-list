import styled from '@emotion/styled';

const StyledLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

export const Loading = ({ message }: { message: string }) => {
  return <StyledLoading>{message}</StyledLoading>;
};
