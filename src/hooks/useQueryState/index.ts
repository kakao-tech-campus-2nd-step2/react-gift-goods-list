import { useState } from 'react';

export default function useQueryState<T>() {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  return {
    data,
    isLoading,
    error,
    setData,
    setIsLoading,
    setError,
  };
}
