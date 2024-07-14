import styled from '@emotion/styled';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

import Loading from '@/components/Loading';
import { ProductData } from '@/types';

type Props = {
  items: ProductData[];
};

export const ThemeGoodsSection = ({ items }: Props) => {
  if (items.length === 0) return <Loading />;

  return (
    <Wrapper>
      <Container>
        {items && items.length > 0 ? (
          <Grid
            columns={{
              initial: 2,
              md: 4,
            }}
            gap={16}
          >
            {items.map(({ id, imageURL, name, price, brandInfo }) => (
              <DefaultGoodsItems
                key={id}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            ))}
          </Grid>
        ) : (
          <NoProductsMessage>상품이 없어요.</NoProductsMessage>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const NoProductsMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
`;
