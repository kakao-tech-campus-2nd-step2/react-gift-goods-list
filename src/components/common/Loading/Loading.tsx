import styled from '@emotion/styled';
import type { ReactNode, SVGProps } from 'react';

interface SvgProps {
  children?: ReactNode | ReactNode[];
  svgProps?: Omit<SVGProps<SVGSVGElement>, 'children'>;
}

function Svg({ children, svgProps }: SvgProps) {
  return <svg {...svgProps}>{children}</svg>;
}

interface LoadingProps {
  size?: number;
  sw?: number;
}

function Loading({ size = 49, sw = 7 }: LoadingProps) {
  return (
    <Svg
      svgProps={{
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`,
      }}
    >
      <LoadingCircle
        cx={size / 2}
        cy={size / 2}
        r={(size - sw) / 2}
        fill="none"
        stroke="gray"
        strokeWidth={sw}
      />
    </Svg>
  );
}

export default Loading;

const LoadingCircle = styled.circle`
  animation: 1s linear infinite circle_loading;
  stroke-dasharray: 100, 76;
  stroke-dashoffset: 44;
  stroke-linecap: round;

  @keyframes circle_loading {
    0% {
      stroke-dashoffset: 44;
    }
    100% {
      stroke-dashoffset: 220;
    }
  }
`;
