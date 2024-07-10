import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { axiosInstance } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);

  useEffect(() => {
    const fetchThemeGoods = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/themes/${themeKey}/products`, {
          params: {
            maxResults: 20,
          },
        });
        if (response.data.products) {
          setGoodsList(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching theme goods:', error);
      }
    };

    fetchThemeGoods();
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
