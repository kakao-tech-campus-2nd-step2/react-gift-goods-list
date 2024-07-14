import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import ShowError from '@/components/Error/ShowError';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection/ThemeHeroSection';
import Loading from '@/components/Loading/Loading';
import type { ThemeData } from '@/types/types';
import { fetchData } from '@/utils/api/api';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  // const [themes, setThemes] = useState<ThemeData[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchThemes = async (): Promise<ThemeData[]> => {
    const response = await fetchData('/api/v1/themes');
    return response.themes;
  };

  const {
    data: themes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  if (isLoading) {
    return Loading();
  }
  if (error) {
    return ShowError((error as Error).message);
  }
  if (!themes || themes?.length === 0) {
    return ShowError('데이터 없음');
  }

  return (
    <>
      <ThemeHeroSection themes={themes} themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
