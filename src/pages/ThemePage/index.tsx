import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BACKEND_API } from '@/constants/api';
import ROUTES from '@/constants/routes';
import BaseLayout from '@/layouts/BaseLayout';
import { themeListData } from '@/mocks/mockData';
import { GetThemesResponse, ThemeData } from '@/types/themeType';

import { ThemeContent } from './components/ThemeContent';
import { ThemeHeader } from './components/ThemeHeader';

export const ThemePage = () => {
  const navigate = useNavigate();
  const { themeKey } = useParams();

  const [fetchState, setFetchState] = useState<{
    isLoading: boolean;
    isError: boolean | undefined;
    data: ThemeData | undefined;
  }>({
    isLoading: false,
    isError: undefined,
    data: undefined,
  });

  const updateFetchState = (newState: Partial<typeof fetchState>) => {
    setFetchState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

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
        updateFetchState({ data: theme, isLoading: false });
      } catch (error) {
        updateFetchState({ isError: true, isLoading: false });
      }
    };

    fetchThemeData();
  }, [themeKey]);

  if (fetchState.isLoading) return <div>loading</div>;
  if (fetchState.isError) return <div>데이터를 가져오는데 실패했습니다.</div>;
  if (!fetchState.data) return null;

  const testContent = themeListData[fetchState.data.label];

  return (
    <BaseLayout>
      <ThemeHeader themeHeaderData={fetchState.data} />
      <ThemeContent items={testContent} />
    </BaseLayout>
  );
};
