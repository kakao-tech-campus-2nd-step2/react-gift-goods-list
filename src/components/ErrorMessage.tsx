import styled from '@emotion/styled';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <ErrorBox>{message}</ErrorBox>;
};

export default ErrorMessage;

const ErrorBox = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding-top: 15px;
`;
