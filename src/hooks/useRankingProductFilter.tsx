import { useState } from 'react';

import type { RankingFilterOption } from '@/types';

export const useRankingProductFilter = (initialFilterOption: RankingFilterOption) => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>(initialFilterOption);

  const changeFilter = (newFilterOption: RankingFilterOption) => {
    setFilterOption(newFilterOption);
  };

  return {
    filterOption,
    changeFilter,
  };
};
