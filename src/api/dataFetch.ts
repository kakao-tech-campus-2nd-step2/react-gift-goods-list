import { useState, useEffect } from 'react';

export const useFetchData = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 400) {
            setError('에러가 발생했습니다.');
          } else {
            setError(`Error: ${err.response.status}`);
          }
        } else if (err.request) {
          setError('응답을 받지 못했습니다.');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
};
