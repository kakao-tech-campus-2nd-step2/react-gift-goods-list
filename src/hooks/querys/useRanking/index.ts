import { useQuery } from '@tanstack/react-query';

import mock from '@/apis/index';
import type { RankingFilterOption } from '@/types';

export default function useRanking(props: RankingFilterOption) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ranking'],
    queryFn: () => mock.getRanking(props),
  });
  return { data, isLoading, error };
}
