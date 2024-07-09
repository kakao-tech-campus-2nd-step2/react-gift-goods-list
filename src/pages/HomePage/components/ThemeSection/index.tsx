import { Link } from 'react-router-dom';

import { useThemeListData } from '@/pages/HomePage/hooks/useThemeListData';

import { Content } from '@/components/Content';
import { Container } from '@/components/ui/Layout/Container';
import { Grid } from '@/components/ui/Layout/Grid';

import { ThemeItem } from './ThemeItem';
import { gridStyle } from './styles';

export const ThemeSection = () => {
  const { themeList, loading, error } = useThemeListData();

  if (error) return <Content justifyContent="center">{error}</Content>;
  if (loading) return <Container justifyContent="center">loading...</Container>;

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
