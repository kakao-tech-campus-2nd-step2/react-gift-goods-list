import type { QueryFunction, QueryKey } from 'react-query';
import { useQuery } from 'react-query';

import { getErrorMessage } from './errorHandler';

interface UseDataParams<TData> {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
}

export const useData = <TData>({ queryKey, queryFn }: UseDataParams<TData>) => {
  const { data, error, isLoading } = useQuery<TData, Error>(queryKey, queryFn);

  const errorMessage = error ? getErrorMessage(error) : null;

  return { data, errorMessage, isLoading };
};
