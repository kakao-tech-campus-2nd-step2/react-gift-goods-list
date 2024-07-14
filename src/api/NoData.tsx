import styled from '@emotion/styled';

const NoDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  text-align: center;
`;

const NoDataMessage = styled.div`
  font-size: 1.5rem;
  color: #666;
  margin: 10px 0;
`;

const NoDataIcon = styled.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 20px;
`;

type NoDataProps = {
  message?: string;
};

export const NoData = ({ message = '데이터가 없습니다' }: NoDataProps) => (
  <NoDataWrapper>
    <NoDataIcon>🚫</NoDataIcon>
    <NoDataMessage>{message}</NoDataMessage>
  </NoDataWrapper>
);
