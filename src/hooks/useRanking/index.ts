import { useEffect } from 'react';

import mock from '@/apis/index';
import type { RankingFilterOption } from '@/types';
import type { Product } from '@/types/product';

import useQueryState from '../useQueryState';

export default function useRanking({ targetType, rankType }: RankingFilterOption) {
  const { data, isLoading, error, setData, setIsLoading, setError } = useQueryState<Product[]>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setData(undefined);
        setError(undefined);
        const response = await mock.getRanking({
          targetType,
          rankType,
        });
        setData(response);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setData, setIsLoading, setError, targetType, rankType]);

  return {
    data,
    isLoading,
    error,
  };
}
