import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchThemeProductData } from '@/services/themeProductData';
import { ProductData } from '@/types/productType';

export const useThemeProductData = (themeKey: string) => {
  const {
    data: themeProducts,
    loading,
    error,
    fetchData,
  } = useFetchData<ProductData[]>();

  useEffect(() => {
    (async () => {
      await fetchData(() => fetchThemeProductData(themeKey));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeKey]);

  return { themeProducts, loading, error };
};
