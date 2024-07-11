import styled from "@emotion/styled";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: #d32f2f;
  font-size: 18px;
  text-align: center;
  padding: 20px;
`;

export default ErrorMessage;