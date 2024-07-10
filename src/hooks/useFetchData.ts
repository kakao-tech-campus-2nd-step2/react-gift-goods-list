import { useState } from 'react';

export const useFetchData = <T>() => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return { data, loading, error, setData, setLoading, setError };
};
