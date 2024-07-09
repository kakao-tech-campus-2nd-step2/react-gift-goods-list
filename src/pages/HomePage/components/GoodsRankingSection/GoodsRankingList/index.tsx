import { useExpansionControl } from '@/pages/HomePage/hooks/useExpansionControl';
import { useRankListData } from '@/pages/HomePage/hooks/useRankListData';
import { useVisibleList } from '@/pages/HomePage/hooks/useVisibleList';
import { RankingFilter } from '@/types/productType';

import { OneTextContainer } from '@/components/OneTextContainer';
import { Container } from '@/components/ui/Layout/Container';

import { RankList } from './RankList';
import { ShowMoreButton } from './ShowMoreButton';

type GoodsRankingListProps = {
  filter: RankingFilter;
};

export const GoodsRankingList = ({ filter }: GoodsRankingListProps) => {
  const { rankList, loading, error } = useRankListData(filter);

  const { visibleItems, visibleItemCount, setVisibleItemCount } =
    useVisibleList(rankList, filter);

  const { isExpanded, handleShowLess, handleShowMore } = useExpansionControl(
    rankList.length,
    visibleItemCount,
    setVisibleItemCount
  );

  const text = isExpanded ? '접기' : '더보기';
  const onClick = isExpanded ? handleShowLess : handleShowMore;

  if (error) return <OneTextContainer>{error}</OneTextContainer>;
  if (loading) return <OneTextContainer>loading...</OneTextContainer>;
  if (!rankList.length)
    return <OneTextContainer>상품 목록이 없습니다.</OneTextContainer>;

  return (
    <Container flexDirection="column" gap="2rem">
      <RankList filteredRankList={visibleItems} />
      <ShowMoreButton text={text} onClick={onClick} />
    </Container>
  );
};
