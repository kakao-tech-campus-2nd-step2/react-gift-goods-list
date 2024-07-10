import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setIsError(false);

      try {
        const productsData = await fetchThemeProducts(themeKey);
        setProducts(productsData);
      } catch (error) {
        setIsError(true);

        const response = (error as AxiosError).response;
        
        switch (response?.status) {
          case 400:
            setErrorMessage('잘못된 요청입니다.');
            break;
          case 404:
            setErrorMessage('해당 테마의 상품을 찾을 수 없습니다.');
            break;
          default:
            setErrorMessage('에러가 발생했습니다.');
        }

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
        {!loading && isError && <Message>{errorMessage}</Message>}
        {!loading && !isError && products.length === 0 && <Container><Message>상품이 없어요.</Message></Container>}
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
  border-left-color: rgba(255, 255, 255);
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
