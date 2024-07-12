import styled from "@emotion/styled";

interface EmptyDataProps {
  message?: string;
}

const EmptyData = ({ message = "보여줄 데이터가 없어요 🤨" }: EmptyDataProps) => {
  return (
    <EmptyDataContainer>
      {message}
    </EmptyDataContainer>
  )
};

const EmptyDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: #555;
  font-size: 18px;
  text-align: center;
  padding: 20px;
`;

export default EmptyData;