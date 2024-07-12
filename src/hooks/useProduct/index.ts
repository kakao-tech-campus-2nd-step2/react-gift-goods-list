import mock from '@/apis/index';
import type { GetThemesParams } from '@/apis/product';

import useAsyncQuery from '../useAsyncQuery';

export default function useProduct(params: Omit<GetThemesParams, 'pageToken'>) {
  const { data, isLoading, error } = useAsyncQuery(mock.getProductWithTheme, params);

  return { data, error, isLoading };
}
