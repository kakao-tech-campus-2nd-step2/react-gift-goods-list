import mock from '@/apis/index';
import type { RankingFilterOption } from '@/types';

import useAsyncQuery from '../useAsyncQuery';

export default function useRanking({ targetType, rankType }: RankingFilterOption) {
  const { data, error, isLoading } = useAsyncQuery(mock.getRanking, { targetType, rankType }, [
    targetType,
    rankType,
  ]);

  return {
    data,
    isLoading,
    error,
  };
}
