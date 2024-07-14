import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import type {ProductData } from '@/api/api';
import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {

  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchThemeProducts({ themeKey, maxResults: 20 })
        if (response.products.length === 0) {
          setError('No Products found for this theme')
        } else {
          setProducts(response.products)
        }
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError('Products not found')
          } else if (err.response?.status === 500){
            setError('Internal server error')
          } else {
            setError('An unexpected error')
          }
        } else {
          setError('Failed to load products')
        }
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [themeKey])

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (error) {
    return <ErrorWrapper>{error}</ErrorWrapper>;
  }

  console.log(products)

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

const LoadingWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: red;
`;
