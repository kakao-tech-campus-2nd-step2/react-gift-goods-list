import styled from '@emotion/styled';

import { GoodsItem } from '@/components/common/GoodsItem';
import { Container } from '@/components/common/Layout/Container';
import { Grid } from '@/components/common/Layout/Grid';
import { useThemeProducts } from '@/services/useThemeProducts';

export const ItemList = ({ themeKey }: { themeKey: string }) => {
  const data = useThemeProducts(themeKey);
  const products = data?.products ?? [];

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
        </Grid>
      </Container>
    </ListWrapper>
  );
};
const ListWrapper = styled.section`
  width: 100%;
  padding: 40px 20px;
`;
