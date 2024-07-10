import { useState } from 'react';

export const useFetchData = <T>() => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (fetchFunction: () => Promise<T>) => {
    setError('');
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
