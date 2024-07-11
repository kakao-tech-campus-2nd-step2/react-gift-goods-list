import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { GoodsItem } from '@/components/common/GoodsItem';
import { HandleBox, Loading } from '@/components/common/Handle';
import { Container } from '@/components/common/Layout/Container';
import { Grid } from '@/components/common/Layout/Grid';
import { useThemeProducts } from '@/services/useThemeProducts';

export const ItemListWithInfiniteScroll = ({ themeKey }: { themeKey: string }) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useThemeProducts(themeKey);

  const { ref, inView } = useInView({
    threshold: 0.8,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <HandleBox>선물 테마 Key에 해당하는 선물 테마가 없어요.</HandleBox>;
  }

  const products = data?.pages.flatMap((page) => page.products) ?? [];
  if (products.length == 0) {
    return <HandleBox>상품이 없어요!</HandleBox>;
  }

  return (
    <ListWrapper>
      <Container justifyContent="center" alignItems="center" maxWidth="1024px">
        <Grid columns={{ init: 2, sm: 2, md: 4 }} gap={20}>
          {products.map((item) => (
            <GoodsItem
              key={item.id}
              imageSrc={item.imageURL}
              subtitle={item.brandInfo.name}
              title={item.name}
              amount={item.price.basicPrice}
            />
          ))}
          <div ref={ref}></div>
        </Grid>
      </Container>
    </ListWrapper>
  );
};
const ListWrapper = styled.section`
  width: 100%;
  padding: 40px 20px;
`;
