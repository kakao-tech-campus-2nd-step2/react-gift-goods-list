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
  const [products, setProducts] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  const url = `https://react-gift-mock-api-two.vercel.app/api/v1/themes/${themeKey}/products`;
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products.slice(0, 20));
      })
      .catch((err) => {
        console.error('Error fetching themes:', err);
        setError(err); // 에러 메시지 설정
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 해제
      });
  }, [url]);

  if (loading)
    return (
      <Container>
        <div>데이터를 로딩중입니다.</div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div>Error: {error}</div>
      </Container>
    );
  if (products.length === 0)
    return (
      <Container>
        <div>데이터가 존재하지 않습니다.</div>
      </Container>
    );

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
