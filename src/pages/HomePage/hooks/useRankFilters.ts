import { useState } from 'react';

import { RankingFilter } from '../types';

export const useRankFilters = () => {
  const [filter, setFilter] = useState<RankingFilter>({
    targetType: 'ALL',
    rankType: 'MANY_WISH_RECEIVE',
  });

  const handleFilter = (
    key: keyof RankingFilter,
    value: RankingFilter[keyof RankingFilter]
  ) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  return { filter, handleFilter };
};
