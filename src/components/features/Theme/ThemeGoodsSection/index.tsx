import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loader } from '@/components/common/Spinner';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import apiClient from '@/utils/api';

const fetchProductsByTheme = async (themeKey: string) => {
  const response = await apiClient.get<{ products: GoodsData[] }>(`/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
    },
  });
  return response.data.products;
};

export const ThemeProductsSection = () => {
  const { themeKey } = useParams<{ themeKey: string }>();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery(['themeProducts', themeKey], () => fetchProductsByTheme(themeKey!), {
    enabled: !!themeKey,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404 ? '상품을 찾을 수 없습니다.' : '오류가 발생했습니다.';
    return <div>{errorMessage}</div>;
  }

  if (!products || products.length === 0) {
    return <div>상품이 없어요.</div>;
  }

  return (
    <ProductsWrapper>
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
    </ProductsWrapper>
  );
};

const ProductsWrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
