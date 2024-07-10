import { Keyframes, css } from '@emotion/react';

import { colors } from '@/styles/theme';

export const containerStyle = css({
  height: '15rem',
  gap: '0.5rem',
});

export const dotStyle = (animation: Keyframes, delay: number) =>
  css({
    animation: `${animation} 0.75s infinite ease-in-out`,
    animationDelay: `${delay}ms`,
    width: '0.7rem',
    height: '0.7rem',
    borderRadius: '50%',
    backgroundColor: colors.black,
  });
