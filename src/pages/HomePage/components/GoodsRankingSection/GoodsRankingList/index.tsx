import { useVisibleList } from '@/pages/HomePage/hooks/useFilteredList';
import { useVisibleCount } from '@/pages/HomePage/hooks/useVisibleCount';
import { ProductData, RankingFilter } from '@/pages/HomePage/types';

import { Container } from '@/components/ui/Layout/Container';

import { RankList } from './RankList';
import { ShowMoreButton } from './ShowMoreButton';

type GoodsRankingListProps = {
  goodsList: ProductData[];
  filter: RankingFilter;
};

export const GoodsRankingList = ({
  goodsList,
  filter,
}: GoodsRankingListProps) => {
  const { visibleItems, visibleItemCount, setVisibleItemCount } =
    useVisibleList(goodsList, filter);

  const { isExpanded, handleShowLess, handleShowMore } = useVisibleCount(
    goodsList.length,
    visibleItemCount,
    setVisibleItemCount
  );

  const text = isExpanded ? '접기' : '더보기';
  const onClick = isExpanded ? handleShowLess : handleShowMore;

  return (
    <Container flexDirection="column" gap="2rem">
      <RankList filteredRankList={visibleItems} />
      <ShowMoreButton text={text} onClick={onClick} />
    </Container>
  );
};
