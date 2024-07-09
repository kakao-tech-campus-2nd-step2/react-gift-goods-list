import { Link } from 'react-router-dom';

import { useThemeListData } from '@/pages/HomePage/hooks/useThemeListData';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Grid } from '@/components/ui/Layout/Grid';

import { ThemeItem } from './ThemeItem';
import { gridStyle } from './styles';

export const ThemeSection = () => {
  const { themeList, loading, error } = useThemeListData();

  if (error) return <OneTextContainer>{error}</OneTextContainer>;
  if (loading) return <OneTextContainer>loading...</OneTextContainer>;

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
        {themeList.map((theme) => (
          <Link key={theme.id} to={`/theme/${theme.key}`}>
            <ThemeItem label={theme.label} imageURL={theme.imageURL} />
          </Link>
        ))}
      </Grid>
    </Content>
  );
};
