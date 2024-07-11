import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface UseFetchDataProps<T> {
  fetchData: () => Promise<T>;
}

interface UseFetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetchData = <T>({ fetchData }: UseFetchDataProps<T>): UseFetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataCallback = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchData();
      setData(res);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 400) {
          setError('잘못된 요청입니다.');
        } else if (status === 403) {
          setError('권한이 없습니다.');
        } else if (status === 404) {
          setError('찾을 수 없는 페이지입니다.');
        } else if (status === 500) {
          setError('서버 오류입니다.');
        } else {
          setError(err.response?.data);
        }
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchDataCallback();
    console.log('ddd');
  }, [fetchDataCallback]);

  return { data, loading, error };
};
