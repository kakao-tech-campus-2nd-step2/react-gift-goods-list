import styled from '@emotion/styled';

const LoadingSpinner = () => {
  return (
    <LoadingSpinnerLayout>
      <Spinner />
    </LoadingSpinnerLayout>
  );
};

export default LoadingSpinner;

const LoadingSpinnerLayout = styled.div`
  margin: 5px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(84, 83, 83, 0.1);
  /* border-width: 4px; */
  /* border-style: solid; */
  /* border-color: #f3f3f3; */
  border-image: initial;
  width: 25px;
  height: 25px;
  border-radius: 50%;

  animation: spin 1s linear infinite;

  @keyframes identifier {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
