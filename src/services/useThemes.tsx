import { useEffect, useState } from 'react';

import { instantAxios } from '.';
import type { Theme } from './types';

export type ThemeResponseData = {
  themes: Theme[];
};

export const useThemes = () => {
  const [data, setData] = useState<ThemeResponseData | undefined>();

  useEffect(() => {
    const getThemes = async () => {
      try {
        const response = await instantAxios.get<ThemeResponseData>('v1/themes');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching theme data:', error);
      }
    };
    getThemes();
  }, []);

  return data;
};
