import { useEffect, useState } from 'react';

import { axiosInstance } from '.';
import type { Theme } from './types';

export const useThemes = () => {
  const [data, setData] = useState<Theme[]>();

  useEffect(() => {
    let ignore = false;
    const getThemes = async () => {
      try {
        const response = await axiosInstance.get('v1/themes');
        if (!ignore) {
          setData(response.data.themes);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching theme data:', error);
      }
    };
    getThemes();
    return () => {
      ignore = true;
    };
  }, []);

  return data;
};
