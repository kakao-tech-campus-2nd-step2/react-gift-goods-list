import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchThemeProducts } from '@/api/theme';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loader } from '@/components/common/Loader';
import { breakpoints } from '@/styles/variants';
import type { ProductData, ThemeProductResponse } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: ThemeProductResponse = await fetchThemeProducts(themeKey, 20);
        setProducts(data.products);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 400:
              setError('잘못된 요청입니다.');
              break;
            case 404:
              setError('상품을 찾을 수 없습니다.');
              break;
            case 500:
              setError('서버 오류가 발생했습니다.');
              break;
            default:
              setError('오류가 발생했습니다.');
          }
        } else {
          setError('네트워크 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [themeKey]);

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : products.length === 0 ? (
          <Message>상품이 없어요.</Message>
        ) : (
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
        )}
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

const Message = styled.p`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
