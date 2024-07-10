import { useEffect, useState } from 'react';

import { fetchThemeProductData } from '@/services/themeProductList';

import { ProductData } from '@/types/productType';

export const useThemeProductData = (themeKey: string) => {
  const [themeProducts, setThemeProducts] = useState<ProductData[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchThemeProductData(themeKey);

      if (response.products) setThemeProducts(response.products);

      if (response.error) setError(response.error);

      setLoading(false);
    };
    fetchData();
  }, [themeKey]);

  return { themeProducts, loading, error };
};
