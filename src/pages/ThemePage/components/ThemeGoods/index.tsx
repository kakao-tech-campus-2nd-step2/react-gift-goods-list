import { useThemeProductData } from '@/pages/ThemePage/hooks/useThemeProductData';
import { ProductData } from '@/types/productType';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';
import { GoodsItem } from '@/components/ui/GoodsItem/Default';
import { Grid } from '@/components/ui/Layout/Grid';

import { contentStyle } from './styles';

type ThemeGoodsProps = {
  themeKey: string;
};

export const ThemeGoods = ({ themeKey }: ThemeGoodsProps) => {
  const { themeProducts, loading, error } = useThemeProductData(themeKey);

  if (error) return <OneTextContainer>{error}</OneTextContainer>;
  if (loading) return <OneTextContainer>loading...</OneTextContainer>;
  if (!themeProducts?.length)
    return <OneTextContainer>상품 목록이 없습니다.</OneTextContainer>;

  return (
    <Content>
      <Grid
        gap={16}
        columns={{
          initial: 2,
          lg: 4,
          md: 2,
          sm: 2,
        }}
        css={contentStyle}
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
