import { Link } from 'react-router-dom';

import { useThemeCategoryData } from '@/pages/HomePage/hooks/useThemeCategoryData';
import { ThemeCategoryData } from '@/types/themeType';

import { Content } from '@/components/Content';
import { LoadingDots } from '@/components/LoadingDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Grid } from '@/components/ui/Layout/Grid';

import { ThemeCategoryItem } from './ThemeCategoryItem';
import { gridStyle } from './styles';

export const ThemeCategorySection = () => {
  const { themeCategoryList, loading, error } = useThemeCategoryData();

  if (error) {
    return <OneTextContainer>{error}</OneTextContainer>;
  }

  if (loading) {
    return <LoadingDots />;
  }

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
        {themeCategoryList?.map(
          ({ id, key, label, imageURL }: ThemeCategoryData) => (
            <Link key={id} to={`/theme/${key}`}>
              <ThemeCategoryItem label={label} imageURL={imageURL} />
            </Link>
          )
        )}
      </Grid>
    </Content>
  );
};