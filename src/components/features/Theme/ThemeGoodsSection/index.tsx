import styled from '@emotion/styled';
import { useEffect,useState } from 'react';

import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';


interface ThemeGoodsSectionProps {
  themeKey: string;
}

export const ThemeGoodsSection = ({ themeKey }: ThemeGoodsSectionProps) => {
  const [products, setProducts] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchThemeProducts(themeKey);
        if (fetchedProducts.length === 0) {
          setFetchError('No products found.');
        } else {
          setProducts(fetchedProducts);
          setFetchError('');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setFetchError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [themeKey]);

  if (loading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  if (fetchError) {
    return <ErrorMessage>{fetchError}</ErrorMessage>;
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;