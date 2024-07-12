import styled from '@emotion/styled';

export const NoDataMessage = ({ message }: { message: string }) => {
  return <NoDataContainer>{message}</NoDataContainer>;
};

const NoDataContainer = styled.div`
text-align: center
padding: 50px
font-size: 20px`;
