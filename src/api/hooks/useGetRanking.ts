import { useQuery } from 'react-query';

import { axiosInstance } from '@/api';

const useGetRanking = <T>(url: string, params: object) => {
  const queryParams = JSON.stringify(params);

  return useQuery<T, Error>([url, queryParams], async () => {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  });
};

export default useGetRanking;
