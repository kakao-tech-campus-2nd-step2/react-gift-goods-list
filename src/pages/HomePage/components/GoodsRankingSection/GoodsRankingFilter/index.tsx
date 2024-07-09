import { RankingFilter } from '@/types/productType';

import { FilterRank } from './FilterRank';
import { FilterTarget } from './FilterTarget';

type GoodsRankingFilterProps = {
  filter: RankingFilter;
  handleFilter: (
    key: keyof RankingFilter,
    value: RankingFilter[keyof RankingFilter]
  ) => void;
};

export const GoodsRankingFilter = ({
  filter,
  handleFilter,
}: GoodsRankingFilterProps) => {
  return (
    <>
      <FilterTarget
        targetFilter={filter.targetType}
        setTargetFilter={handleFilter}
      />
      <FilterRank rankFilter={filter.rankType} setRankFilter={handleFilter} />
    </>
  );
};
