import { useEffect } from 'react';

import mock from '@/apis/index';
import type { Theme } from '@/types/product';

import useQueryState from '../useQueryState';

export default function useTheme() {
  const { data, isLoading, error, setData, setIsLoading, setError } = useQueryState<Theme[]>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await mock.getThemes();
        setData(response);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setData, setIsLoading, setError]);

  return {
    data,
    isLoading,
    error,
  };
}
