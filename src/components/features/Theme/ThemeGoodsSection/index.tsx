import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchThemeProducts } from '@/api/theme';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { ProductData } from '@/types/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchThemeProducts(themeKey);
        if (response.products.length === 0) {
          setFetchError('상품이 없습니다');
        } else {
          setProducts(response.products);
          setFetchError(null);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 404:
              setFetchError('상품을 찾을 수 없습니다');
              break;
            case 500:
              setFetchError('서버 오류가 발생했습니다');
              break;
            default:
              setFetchError('예상치 못한 오류가 발생했습니다');
          }
        } else {
          setFetchError('상품을 불러오는 데 실패했습니다');
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [themeKey]);

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (fetchError) return <ErrorMessage>{fetchError}</ErrorMessage>;
  if (products.length === 0) return <NoDataMessage>상품이 없습니다</NoDataMessage>;

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
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: red;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
`;
