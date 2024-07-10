import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getThemeProducts } from '@/api';
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await getThemeProducts(themeKey);
        setGoods(data);
      } catch (err) {
        setError('상품을 가져오는데 실패하였습니다.');
      }
    };

    fetchGoods();
  }, [themeKey]);

  if (error) {
    return <div>{error}</div>;
  }

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
