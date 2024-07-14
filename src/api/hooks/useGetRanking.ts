import type { UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';

import { axiosInstance } from '@/api';

const useGetRanking = <T>(
  url: string,
  params: object,
  queryOptions?: UseQueryOptions<T, Error>,
) => {
  const queryParams = JSON.stringify(params);

  return useQuery<T, Error>(
    [url, queryParams],
    async () => {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    },
    queryOptions,
  );
};

export default useGetRanking;
