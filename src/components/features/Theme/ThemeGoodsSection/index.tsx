import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchThemeProducts } from '@/api/themeProducts';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Message } from '@/components/common/Message';
import { breakpoints } from '@/styles/variants';
import type { ProductData } from '@/types/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, setProducts] = useState<ProductData[]>([]);

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsError(false);

    const getProducts = async () => {
      try {
        const productsData = await fetchThemeProducts(themeKey);
        setProducts(productsData);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [themeKey]);

  return (
    <Wrapper>
      <Container>
      {loading && <LoadingContainer><Loading /></LoadingContainer>}
        {!loading && isError && <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>}
        {!loading && !isError && products.length === 0 && <Container><Message>보여줄 상품이 없어요!</Message></Container>}
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {products.map((product) => (
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

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: rgb(255, 255, 255);
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
