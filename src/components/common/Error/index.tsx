import styled from '@emotion/styled';

export const Error = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 30px 0;
`;
