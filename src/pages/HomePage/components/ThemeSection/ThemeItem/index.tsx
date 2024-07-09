import { DEFAULT_IMAGE_URL } from '@/constants/data';

import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

import { containerStyle, titleStyle } from './styles';

type ThemeItemProps = {
  label: string;
  imageURL?: string;
};

export const ThemeItem = ({
  label,
  imageURL = DEFAULT_IMAGE_URL,
}: ThemeItemProps) => {
  return (
    <Container flexDirection="column" alignItems="center" css={containerStyle}>
      <Image src={imageURL} radius={1.8} ratio="square" alt={label} />
      <div css={titleStyle}>{label}</div>
    </Container>
  );
};
