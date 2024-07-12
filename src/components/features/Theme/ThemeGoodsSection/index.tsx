import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import apiClient from '@/api';
import type { GetThemeProductsResponse,ProductData } from '@/api/types/apiTypes';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { useThemeProducts } from '@/hooks/useThemeProducts';
import ErrorMessage from '@/styles/ErrorMessage';
import Loading from '@/styles/Loading';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, { isLoading, isError, errorMessage}] = useThemeProducts(themeKey);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !products) {
    return (
      <ErrorMessage>
        에러가 발생했습니다.
        <br />
        {errorMessage}
      </ErrorMessage>
    );
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
