import { useVisibleList } from '@/pages/HomePage/hooks/useFilteredList';
import { useRankListData } from '@/pages/HomePage/hooks/useRankListData';
import { useVisibleCount } from '@/pages/HomePage/hooks/useVisibleCount';
import { RankingFilter } from '@/pages/HomePage/types';

import { CenteredContent } from '@/components/CenteredContent';
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

  const { isExpanded, handleShowLess, handleShowMore } = useVisibleCount(
    rankList.length,
    visibleItemCount,
    setVisibleItemCount
  );

  const text = isExpanded ? '접기' : '더보기';
  const onClick = isExpanded ? handleShowLess : handleShowMore;

  if (error) return <CenteredContent height="10rem">{error}</CenteredContent>;
  if (loading) return <CenteredContent height="10rem">loading</CenteredContent>;
  if (!rankList.length)
    return (
      <CenteredContent height="10rem">상품 목록이 없습니다.</CenteredContent>
    );

  return (
    <Container flexDirection="column" gap="2rem">
      <RankList filteredRankList={visibleItems} />
      <ShowMoreButton text={text} onClick={onClick} />
    </Container>
  );
};
