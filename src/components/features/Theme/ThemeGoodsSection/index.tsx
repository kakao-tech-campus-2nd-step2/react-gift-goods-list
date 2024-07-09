import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goods, setGoods] = useState<GoodsData[]>([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get(
          `https://react-gift-mock-api-daeun0726.vercel.app/api/v1/themes/${themeKey}/products`,
          {
            params: {
              maxResults: '20',
            },
          },
        );

        const newGoods = response.data.products || [];

        setGoods(newGoods);
      } catch (error) {
        console.error(error);
        setGoods([]);
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
          {goods.map(({ id, imageURL, name, price, brandInfo }) => (
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

export default ThemeGoodsSection;
