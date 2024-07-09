import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { BACKEND_API } from '@/constants/api';
import { GetThemesResponse, ThemeData } from '@/types/themeType';

import { Content } from '@/components/Content';
import { Grid } from '@/components/ui/Layout/Grid';

import { ThemeItem } from './ThemeItem';
import { gridStyle } from './styles';

export const ThemeSection = () => {
  const [themeData, setThemeData] = useState<ThemeData[]>([]);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response =
          await BACKEND_API.get<GetThemesResponse>('/api/v1/themes');

        setThemeData(response.data.themes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchThemeData();
  }, []);

  return (
    <Content height="fit-content" justifyContent="center">
      <Grid
        columns={{
          initial: 4,
          lg: 6,
          md: 4,
          sm: 4,
        }}
        css={gridStyle}
      >
        {themeData.map((theme) => {
          return (
            <Link key={theme.id} to={`/theme/${theme.key}`}>
              <ThemeItem theme={theme} />
            </Link>
          );
        })}
      </Grid>
    </Content>
  );
};
