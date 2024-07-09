import { DEFAULT_IMAGE_URL } from '@/constants/data';
import { ThemeData } from '@/pages/HomePage/types';

import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

import { containerStyle, titleStyle } from './styles';

type ThemeListItemProps = {
  theme: ThemeData;
};

export const ThemeListItem = ({ theme }: ThemeListItemProps) => {
  const imageURL = theme.imageURL || DEFAULT_IMAGE_URL;

  return (
    <Container flexDirection="column" alignItems="center" css={containerStyle}>
      <Image src={imageURL} radius={1.8} ratio="square" alt={theme.label} />
      <div css={titleStyle}>{theme.label}</div>
    </Container>
  );
};
