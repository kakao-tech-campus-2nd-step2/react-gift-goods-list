import { DEFAULT_IMAGE_URL } from '@/constants/data';

import { RankedImage } from '@/components/ui/Image/RankingImage';
import { Container } from '@/components/ui/Layout/Container';

import { GoodsItemProps } from './Default';
import { GoodsItemDetail } from './GoodsItemDetail';
import { containerStyle } from './styles';

interface RankingGoodsItemProps extends GoodsItemProps {
  rank: number;
  isLazy?: boolean;
}

export const RankingGoodsItem = ({
  imageSrc = DEFAULT_IMAGE_URL,
  rank,
  title,
  subtitle,
  amount,
  isLazy,
}: RankingGoodsItemProps) => {
  return (
    <Container maxWidth="100%" flexDirection="column" css={containerStyle}>
      <RankedImage
        rank={rank}
        imageSrc={imageSrc}
        alt={title}
        isLazy={isLazy}
      />
      <GoodsItemDetail subtitle={subtitle} title={title} amount={amount} />
    </Container>
  );
};
