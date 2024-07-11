import { useThemeProductData } from '@/pages/ThemePage/hooks/useThemeProductData';
import { ProductData } from '@/types/productType';

import { Content } from '@/components/Content';
import { LoadingDots } from '@/components/LoadingDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { GoodsItem } from '@/components/ui/GoodsItem/Default';
import { Grid } from '@/components/ui/Layout/Grid';

import { gridStyle } from './styles';

type ThemeGoodsSectionProps = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: ThemeGoodsSectionProps) => {
  const { themeProducts, loading, error } = useThemeProductData(themeKey);

  if (error) {
    return <OneTextContainer>{error}</OneTextContainer>;
  }

  if (loading) {
    return <LoadingDots />;
  }

  if (!themeProducts?.length) {
    return <OneTextContainer>상품 목록이 없습니다.</OneTextContainer>;
  }

  return (
    <Content>
      <Grid
        gap={16}
        columns={{
          initial: 2,
          md: 4,
        }}
        css={gridStyle}
      >
        {themeProducts?.map(
          ({ id, imageURL, brandInfo, name, price }: ProductData) => {
            return (
              <GoodsItem
                key={id}
                imageSrc={imageURL}
                subtitle={brandInfo.name}
                title={name}
                amount={price.sellingPrice}
              />
            );
          }
        )}
      </Grid>
    </Content>
  );
};
