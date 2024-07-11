import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteThemeProducts } from '@/pages/ThemePage/hooks/useThemeProductData';
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
  const { ref, inView } = useInView();

  const { data, status, error, fetchNextPage, hasNextPage } =
    useInfiniteThemeProducts(themeKey);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'error') {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <LoadingDots />;
  }

  const themeProducts = data?.pages.flatMap((page) => page);

  if (!themeProducts.length) {
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
        {themeProducts.map(
          ({ id, imageURL, brandInfo, name, price }: ProductData, index) => {
            return (
              <div
                key={id}
                ref={themeProducts.length === index + 1 ? ref : undefined}
              >
                <GoodsItem
                  imageSrc={imageURL}
                  subtitle={brandInfo.name}
                  title={name}
                  amount={price.sellingPrice}
                />
              </div>
            );
          }
        )}
      </Grid>
    </Content>
  );
};
