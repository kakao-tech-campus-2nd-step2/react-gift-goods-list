import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { ProductData } from '@/api';
import { getThemeProducts } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getThemeProducts(themeKey);
        setProducts(response.products);
        setError(false);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [themeKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했어요.</div>;
  }

  if (products.length === 0) {
    return <div>상품이 없어요.</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {products.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
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
