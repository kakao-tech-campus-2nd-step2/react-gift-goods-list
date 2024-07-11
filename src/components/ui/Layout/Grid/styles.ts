import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';
import { ResponseGrid } from '@/types/uiTypes';

export const gridStyle = (gap: number, columns: number | ResponseGrid) => {
  const baseStyle = {
    display: 'grid',
    width: '100%',
    placeItems: 'start',
    gap: `${gap}px`,
  };

  if (typeof columns === 'number') {
    return css({
      ...baseStyle,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    });
  }

  const breakpoints = [
    'initial',
    ...Object.keys(columns),
  ] as (keyof typeof breakpoint)[];
  const responseGridStyle = breakpoints
    .map((point) => {
      return `@media screen and (min-width: ${breakpoint[point]}) { grid-template-columns: repeat(${columns[point]}, 1fr); }`;
    })
    .join(' ');

  return css({
    ...baseStyle,
    responseGridStyle,
  });
};
