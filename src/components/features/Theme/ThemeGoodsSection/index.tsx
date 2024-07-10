import styled from '@emotion/styled';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

import { useState, useEffect } from 'react';
import { GoodsData } from '@/types';
import { getData } from '@/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [themeGoods, setThemeGoods] = useState<GoodsData[]>([]);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const maxResults = 20;
        const queryParams = `?maxResults=${maxResults}`;

        const data = await getData(`/api/v1/themes/${themeKey}/products${queryParams}`);
        setThemeGoods(data.products);
      } catch (error) {
        console.error('Error fetching theme data:', error);
      }
    };

    fetchThemeData();
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
          {themeGoods.map((good) => (
            <DefaultGoodsItems
              key={good.id}
              imageSrc={good.imageURL}
              title={good.name}
              amount={good.price.sellingPrice}
              subtitle={good.brandInfo.name}
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
