import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loading } from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types/index';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchThemeProducts(themeKey); // API 호출로 테마 상품 데이터를 가져옴
        setGoodsList(products); // 상품 데이터를 상태에 설정
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [themeKey]); // themeKey가 변경될 때마다 데이터 다시 불러옴

  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <Loading /> // 로딩 중일 때 로딩 컴포넌트 표시
        ) : (
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
