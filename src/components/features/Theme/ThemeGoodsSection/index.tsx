import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchThemeProducts } from '@/api/Api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
  goods: GoodsData[];
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [goods, setGoods] = useState<GoodsData[]>([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchThemeProducts(themeKey);
        setGoods(data.products);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          switch (err.response?.status) {
            case 400:
              setError(new Error('죄송합니다. 요청이 잘못되었습니다. 다시 시도해 주세요.'));
              break;
            case 404:
              setError(new Error('찾을 수 없습니다. 요청하신 페이지를 찾을 수 없습니다.'));
              break;
            case 500:
              setError(new Error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'));
              break;
            default:
              setError(
                new Error(`알 수 없는 오류가 발생했습니다. 오류 코드: ${err.response?.status}`),
              );
              break;
          }
        }
      }
    };
    fetchGoods();
  }, [themeKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
