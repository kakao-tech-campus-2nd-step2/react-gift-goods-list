import { useExpansionControl } from '@/pages/HomePage/hooks/useExpansionControl';
import { useRankProductData } from '@/pages/HomePage/hooks/useRankProductData';
import { useVisibleList } from '@/pages/HomePage/hooks/useVisibleList';
import { RankingFilter } from '@/types/productType';

import { LoadingDots } from '@/components/LoadingDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Container } from '@/components/ui/Layout/Container';

import { RankList } from './RankList';
import { ShowMoreButton } from './ShowMoreButton';

type GoodsRankingListProps = {
  filter: RankingFilter;
};

export const GoodsRankingList = ({ filter }: GoodsRankingListProps) => {
  const { rankProducts, loading, error } = useRankProductData(filter);

  const { visibleItems, visibleItemCount, setVisibleItemCount } =
    useVisibleList(rankProducts || [], filter);

  const { isExpanded, handleShowLess, handleShowMore } = useExpansionControl(
    rankProducts?.length || 0,
    visibleItemCount,
    setVisibleItemCount
  );

  if (error) {
    return <OneTextContainer>{error}</OneTextContainer>;
  }

  if (loading) {
    return <LoadingDots />;
  }

  if (!rankProducts?.length) {
    return <OneTextContainer>상품 목록이 없습니다.</OneTextContainer>;
  }

  return (
    <Container flexDirection="column" gap="2rem">
      <RankList filteredRankList={visibleItems} />
      <ShowMoreButton
        text={isExpanded ? '접기' : '더보기'}
        onClick={isExpanded ? handleShowLess : handleShowMore}
      />
    </Container>
  );
};
