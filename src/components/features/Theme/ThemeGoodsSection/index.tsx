import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types/index';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const { data } = await axios.get<{ products: GoodsData[] }>(
          `https://react-gift-mock-api-ychy61.vercel.app/api/v1/themes/${themeKey}/products?pageSize=20`
        );
        setGoodsList(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // 에러 처리 로직을 추가할 수 있습니다.
      }
    };

    fetchGoods();
  }, [themeKey]);

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
          {goodsList.map(({ id, imageURL, name, price, brandInfo }) => (
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
