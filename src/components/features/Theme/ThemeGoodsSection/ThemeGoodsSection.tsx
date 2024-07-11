import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container/Container';
import { Grid } from '@/components/common/layouts/Grid/Grid';
import { breakpoints } from '@/styles/variants';
import type { product } from '@/types/types';
import { url } from '@/utils/url/url';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/themes/${themeKey}/products`);
        const showProducts = response.data.products.slice(0, 20);
        setProducts(showProducts);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };
    fetchThemes();
  }, [themeKey]);

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
          {products.map((product: product) => (
            <DefaultGoodsItems
              key={product.id}
              imageSrc={product.imageURL}
              title={product.name}
              amount={product.price.sellingPrice}
              subtitle={product.brandInfo.name}
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
