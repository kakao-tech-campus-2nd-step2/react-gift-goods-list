import styled from "@emotion/styled";

interface ErrorMessageProps {
  code?: string;
  message: string;
}

const ErrorMessage = ({ code, message }: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      {code && <Code>(Error Code: {code}) </Code>}  {message} <Emoji>😔</Emoji>
      </ErrorContainer>
  ) 
};

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 18px;
  text-align: center;
  padding: 20px;
`;

const Code = styled.span`
  margin-right: 10px;
  font-size: 16px;
  color: #d32f2f;
`;

const Emoji = styled.span`
  margin-left: 5px;
`;

export default ErrorMessage;