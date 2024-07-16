import { useState } from 'react';
import { useQuery } from 'react-query';

import { getRankingProducts } from '@/libs/api';
import type { RankingFilterOption } from '@/types';

export const useRankingProducts = (initialFilterOption: RankingFilterOption) => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>(initialFilterOption);
  const [isEmpty, setIsEmpty] = useState(false);
  const [errorState, setErrorState] = useState('');

  const { data, isLoading, isFetching, refetch } = useQuery(
    ['rankingProducts', filterOption],
    () => getRankingProducts(filterOption),
    {
      keepPreviousData: true,
      onSuccess: (fetchedData) => {
        // Renamed to 'fetchedData'
        if (fetchedData || fetchedData.products) {
          setErrorState('');
          if (typeof fetchedData === 'string') {
            setErrorState(fetchedData);
          } else {
            setIsEmpty(fetchedData.products.length === 0);
          }
        } else {
          setIsEmpty(true);
        }
      },
      onError: (err) => {
        setErrorState((err as Error).message);
      },
    },
  );

  const handleFilterChange = (newFilterOption: RankingFilterOption) => {
    setFilterOption(newFilterOption);
    refetch();
  };

  return {
    filterOption,
    isEmpty,
    errorState,
    data,
    isLoading,
    isFetching,
    handleFilterChange,
  };
};
