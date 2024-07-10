import { keyframes } from '@emotion/react';

import { Container } from '../ui/Layout/Container';
import { containerStyle, dotStyle } from './styles';

const syncKeyframes = keyframes`
  33% {
    transform: translateY(5px);
  }
  66% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

type DotProps = {
  delay: number;
};

const Dot = ({ delay }: DotProps) => {
  return <span css={dotStyle(syncKeyframes, delay)} />;
};

export const LoadingDots = () => {
  return (
    <Container alignItems="center" justifyContent="center" css={containerStyle}>
      <Dot delay={0} />
      <Dot delay={200} />
      <Dot delay={400} />
    </Container>
  );
};
