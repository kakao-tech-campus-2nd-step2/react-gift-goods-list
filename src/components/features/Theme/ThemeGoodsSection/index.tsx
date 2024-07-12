import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';

import { axiosInstance } from '@/api';
import { axiosInstance } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  // const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [fetchState, setFetchState] = useState<FetchState<GoodsData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchThemeGoods = async () => {
      setFetchState({ isLoading: true, isError: false, data: [] });
      try {
        const response = await axiosInstance.get(`/api/v1/themes/${themeKey}/products`, {
          params: {
            maxResults: 20,
          },
        });
        const { products } = response.data;
        setFetchState({ isLoading: false, isError: false, data: products });
      } catch (error) {
        console.error('Error fetching theme goods:', error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };

    fetchThemeGoods();
  }, [themeKey]);

  const { isLoading, isError, data } = fetchState;

  return (
    <Wrapper>
      {isLoading ? (
        <Description>로딩 중</Description>
      ) : isError ? (
        <Description>에러가 발생했습니다.</Description>
      ) : data && data.length > 0 ? (
        <Container>
          <Grid
            columns={{
              initial: 2,
              md: 4,
            }}
            gap={16}
          >
            {data.map(({ id, imageURL, name, price, brandInfo }) => (
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
      ) : (
        <Description>상품이 없어요.</Description>
      )}
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

const Description = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
