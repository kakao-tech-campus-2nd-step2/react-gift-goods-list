import { Link } from 'react-router-dom';

import { useThemeCategory } from '@/api/hooks/useThemeCategory';
import { ThemeCategoryData } from '@/types/themeType';

import { Content } from '@/components/Content';
import { LoadingDots } from '@/components/LoadingDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Grid } from '@/components/ui/Layout/Grid';

import { ThemeCategoryItem } from './ThemeCategoryItem';
import { gridStyle, itemContainerStyle } from './styles';

export const ThemeCategorySection = () => {
  const { themeCategoryList, status, error } = useThemeCategory();

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <LoadingDots />;
  }

  return (
    <Content height="fit-content" justifyContent="center">
      <Grid
        columns={{
          initial: 4,
          md: 6,
        }}
        gap={40}
        css={gridStyle}
      >
        {themeCategoryList?.map(
          ({ id, key, label, imageURL }: ThemeCategoryData) => (
            <Link key={id} to={`/theme/${key}`} css={itemContainerStyle}>
              <ThemeCategoryItem label={label} imageURL={imageURL} />
            </Link>
          )
        )}
      </Grid>
    </Content>
  );
};
