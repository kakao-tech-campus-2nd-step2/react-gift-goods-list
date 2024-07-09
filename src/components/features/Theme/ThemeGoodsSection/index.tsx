import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import { apiUrl } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [currentGoodsList, setCurrentGoodsList] = useState<GoodsData[]>([]);

  useEffect(() => {
    const fetchGoodsList = async () => {
      try {
        const maxResults = 20;
        const queryParams = `?maxResults=${maxResults}`;
        const res = await axios.get(`${apiUrl}api/v1/themes/${themeKey}/products${queryParams}`);
        setCurrentGoodsList(res.data.products);
      } catch (err) {
        console.error('Error fetching goods list', err);
      }
    };
    fetchGoodsList();
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
          {currentGoodsList.map((goods) => (
            <DefaultGoodsItems
              key={goods.id}
              imageSrc={goods.imageURL}
              title={goods.name}
              amount={goods.price.sellingPrice}
              subtitle={goods.brandInfo.name}
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
