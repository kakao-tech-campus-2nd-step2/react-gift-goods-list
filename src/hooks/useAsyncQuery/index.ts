import type { DependencyList } from 'react';
import { useEffect } from 'react';

import useQueryState from '../useQueryState';

export default function useAsyncQuery<T, P>(
  queryFn: (params: P) => Promise<T>,
  params: P,
  dependencies: DependencyList = [],
) {
  const { data, isLoading, error, setData, setIsLoading, setError } = useQueryState<T>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData(undefined);
        setError(undefined);
        const response = await queryFn(params);
        setData(response);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    //params를 의존성 배열에 추가하게 되면 무한 루프에 빠지는 것 같습니다..
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData, setIsLoading, setError, queryFn, ...dependencies]);

  return { data, isLoading, error };
}
