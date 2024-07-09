import { useEffect, useState } from 'react';

import instance from './instance';

const useFetch = <T,>(url: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [status, setStatus] = useState({
    loading: true,
    error: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(() => ({ loading: true, error: false }));
        const response = await instance.get(url);
        setData(response.data);
        setStatus(() => ({ loading: false, error: false }));
      } catch (e) {
        setStatus(() => ({ loading: false, error: true }));
      }
    };
    fetchData();
  }, [url]);

  return { data, status };
};

export default useFetch;
