import type { QueryFunction, QueryKey } from 'react-query';
import { useQuery } from 'react-query';

interface UseDataParams<TData> {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
}

export const useData = <TData>({ queryKey, queryFn }: UseDataParams<TData>) => {
  const { data, isLoading } = useQuery<TData, Error>(queryKey, queryFn);

  return { data, isLoading };
};
