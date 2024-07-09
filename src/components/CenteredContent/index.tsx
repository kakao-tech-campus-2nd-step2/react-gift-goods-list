import { ReactNode } from 'react';

import { Content } from '../Content';

type CenteredContentProps = {
  children: ReactNode;
  height?: string;
};

export const CenteredContent = ({ children, height }: CenteredContentProps) => {
  return (
    <Content alignItems="center" justifyContent="center" height={height}>
      {children}
    </Content>
  );
};
