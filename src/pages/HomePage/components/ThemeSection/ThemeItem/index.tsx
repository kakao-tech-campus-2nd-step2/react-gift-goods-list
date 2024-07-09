import { DEFAULT_IMAGE_URL } from '@/constants/data';
import { ThemeData } from '@/types/themeType';

import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

import { containerStyle, titleStyle } from './styles';

type ThemeItemProps = {
  theme: ThemeData;
};

export const ThemeItem = ({ theme }: ThemeItemProps) => {
  const imageURL = theme.imageURL || DEFAULT_IMAGE_URL;

  return (
    <Container flexDirection="column" alignItems="center" css={containerStyle}>
      <Image src={imageURL} radius={1.8} ratio="square" alt={theme.label} />
      <div css={titleStyle}>{theme.label}</div>
    </Container>
  );
};
