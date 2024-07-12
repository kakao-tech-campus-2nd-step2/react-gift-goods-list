import styled from '@emotion/styled';

type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

const ErrorContainer = styled.div`
text-align: center
padding: 50px
font-size: 20px
color: red
`;
