import { CSSObject, css } from '@emotion/react';

import { pulse } from '@/styles/animation';
import { getAspectRatio, getBorderRadius } from '@/styles/utils';
import { colors } from '@/styles/variants/theme';
import { Radius, Ratio } from '@/types/uiTypes';

const transitionStyle = (isLoad: boolean) => {
  const defultStyle = {
    transition: 'opacity 0.6s ease-in-out',
  };

  if (isLoad) {
    return css({
      ...defultStyle,
      opacity: '100',
    });
  }
  return css({
    ...defultStyle,
    opacity: '0',
  });
};

export const imageStyle = (
  isLoad: boolean,
  ratio: Ratio,
  radius: Radius,
  width: string,
  isLazy: boolean
) => {
  const defaultImageStyle: CSSObject = {
    objectFit: 'cover',
    objectPosition: 'center',
    width,
    borderRadius: getBorderRadius(radius),
    aspectRatio: getAspectRatio(ratio),
  };

  if (!isLazy) {
    return css(defaultImageStyle);
  }

  return css({
    ...defaultImageStyle,
    ...transitionStyle(isLoad),
  });
};

export const backgroundStyle = (isLazy: boolean, isLoad: boolean) => {
  if (!isLazy || isLoad) {
    return css({
      animation: 'none',
    });
  }

  return css({
    animation: `${pulse} 2s ease infinite`,
    backgroundColor: colors.gray[300],
  });
};

export const rankingWrapperStyle = css({
  position: 'relative',
  width: '100%',
  height: 'auto',
  display: 'inline-block',
});

export const rankingStyle = (rankingIndex: number) =>
  css({
    position: 'absolute',
    top: '0.25rem',
    left: '0.25rem',
    width: '1.5rem',
    height: '1.5rem',
    zIndex: 10,
    backgroundColor: rankingIndex <= 3 ? colors.pink : colors.gray[400],
    color: colors.white,
    borderRadius: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  });
