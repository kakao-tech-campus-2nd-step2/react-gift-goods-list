import styled from "@emotion/styled";

export const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px;
`;

const Spinner = styled.div`
  border-width: 4px;
  border-style: solid;
  border-color: rgba(177, 177, 177, 0.01) rgba(177, 177, 177, 0.01) rgba(177, 177, 177, 0.01)
    rgb(153, 153, 153);
  border-image: initial;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
