import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BACKEND_API } from '@/constants/api';
import ROUTES from '@/constants/routes';
import BaseLayout from '@/layouts/BaseLayout';
import { ProductData } from '@/types/productType';
import { GetThemesResponse, ThemeData } from '@/types/themeType';

import { ThemeGoods } from './components/ThemeGoods';
import { ThemeHeader } from './components/ThemeHeader';
import { GetProductsResponse } from './types';

export const ThemePage = () => {
  const navigate = useNavigate();
  const { themeKey } = useParams();

  const [fetchState, setFetchState] = useState<{
    isLoading: boolean;
    isError?: boolean;
    themeData?: ThemeData;
    productData?: ProductData[];
  }>({
    isLoading: false,
    isError: undefined,
    themeData: undefined,
  });

  const updateFetchState = useCallback(
    (newState: Partial<typeof fetchState>) => {
      setFetchState((prevState) => ({
        ...prevState,
        ...newState,
      }));
    },
    [setFetchState]
  );

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        updateFetchState({ isLoading: true });
        const response =
          await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');
        const theme = response.data.themes.find((t) => t.key === themeKey);

        if (!theme) {
          navigate(ROUTES.HOME);
          return;
        }
        updateFetchState({ themeData: theme, isLoading: false });
      } catch (error) {
        updateFetchState({ isError: true, isLoading: false });
      }
    };

    const fetchProductData = async () => {
      try {
        const response = await BACKEND_API.get<GetProductsResponse>(
          `/api/v1/themes/${themeKey}/products`,
          {
            params: {
              maxResults: 20,
            },
          }
        );

        updateFetchState({ productData: response.data.products });
      } catch (error) {
        updateFetchState({ isError: true, isLoading: false });
      }
    };

    fetchThemeData();
    fetchProductData();
  }, [navigate, themeKey, updateFetchState]);

  if (fetchState.isLoading) return <div>loading</div>;
  if (fetchState.isError) return <div>데이터를 가져오는데 실패했습니다.</div>;
  if (!fetchState.themeData || !fetchState.productData) return null;

  return (
    <BaseLayout>
      <ThemeHeader themeHeaderData={fetchState.themeData} />
      <ThemeGoods products={fetchState.productData} />
    </BaseLayout>
  );
};
