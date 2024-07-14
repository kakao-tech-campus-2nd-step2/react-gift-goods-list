import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container/Container';
import { Grid } from '@/components/common/layouts/Grid/Grid';
import ShowError from '@/components/Error/ShowError';
import Loading from '@/components/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import type { product } from '@/types/types';
import { fetchData } from '@/utils/api/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const response = await fetchData(`/api/v1/themes/${themeKey}/products`);
        const showProducts = response.products.slice(0, 20);
        setProducts(showProducts);
      } catch (error) {
        setFetchError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, [themeKey]);

  if (loading) {
    return Loading();
  }
  if (fetchError) {
    return ShowError(fetchError);
  }
  if (products?.length == 0) {
    return ShowError('데이터 없음');
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
