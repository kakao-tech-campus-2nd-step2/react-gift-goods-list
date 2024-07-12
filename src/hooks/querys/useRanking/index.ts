import { useQuery } from '@tanstack/react-query';

import mock from '@/apis/index';
import type { RankingFilterOption } from '@/types';

export default function useRanking({ rankType, targetType }: RankingFilterOption) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ranking', rankType, targetType],
    queryFn: () =>
      mock.getRanking({
        rankType,
        targetType,
      }),
  });
  return { data, isLoading, error };
}
