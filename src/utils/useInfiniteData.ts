import type { QueryFunctionContext, QueryKey } from 'react-query';
import { useInfiniteQuery } from 'react-query';

import { getErrorMessage } from './errorHandler';

interface PageResponse {
  nextPageToken: string | null;
}

interface UseInfiniteDataParams<TData extends PageResponse> {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext<QueryKey>) => Promise<TData>;
}

export const useInfiniteData = <TData extends PageResponse>({
  queryKey,
  queryFn,
}: UseInfiniteDataParams<TData>) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<TData, Error>(queryKey, queryFn, {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    });

  return {
    data,
    errorMessage: error ? getErrorMessage(error) : null,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
