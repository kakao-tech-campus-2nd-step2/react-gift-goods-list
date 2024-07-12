import mock from '@/apis/index';

import useAsyncQuery from '../useAsyncQuery';

export default function useTheme() {
  const { data, isLoading, error } = useAsyncQuery(mock.getThemes, {});

  return {
    data,
    isLoading,
    error,
  };
}
