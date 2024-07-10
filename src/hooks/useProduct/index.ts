import { useEffect, useState } from 'react';

import mock from '@/apis/index';
import type { GetThemesParams } from '@/apis/product';
import type { ProductWithInfo } from '@/types/product';

import useQueryState from '../useQueryState';

export default function useProduct(params: Omit<GetThemesParams, 'pageToken'>) {
  const { data, error, isLoading, setData, setError, setIsLoading } =
    useQueryState<ProductWithInfo>();
  const [pageToken, setPageToken] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setData(undefined);
        setError(undefined);

        const response = await mock.getProductWithTheme({
          ...params,
          pageToken,
        });

        setPageToken(response.nextPageToken);
        setData(response);
      } catch (e) {
        console.log(e);
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData, setError, setIsLoading]);

  return { data, error, isLoading };
}
