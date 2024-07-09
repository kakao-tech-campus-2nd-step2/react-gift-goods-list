import styled from '@emotion/styled';

export const HandleBox = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
export const Loading = () => {
  return (
    <Container>
      <DropletSpinner>
        <Droplet />
        <Droplet />
        <Droplet />
      </DropletSpinner>
    </Container>
  );
};

const Container = styled.div`
  height: 360px;
  padding: 50px 0px;
  text-align: center;
`;

const DropletSpinner = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const Droplet = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;

  background-color: #818181;
  border-radius: 50%;
  transform-origin: center bottom;

  animation: bounce 1.2s cubic-bezier(0.3, 0.01, 0.4, 1) infinite;
  :nth-of-type(1) {
    animation-delay: -0.4s;
  }
  :nth-of-type(2) {
    animation-delay: -0.2s;
  }
  :nth-of-type(3) {
    animation-delay: 0s;
  }
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;
