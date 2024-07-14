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
  const [error, setError] = useState<string | null>(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchThemeProducts(themeKey, setError); // API 호출로 테마 상품 데이터를 가져옴
        setGoodsList(data); // 상품 데이터를 상태에 설정
        setError(null); // 에러 상태 초기화
      } catch (err) {
        console.error(err);
        setError('상품 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.'); // 에러 메시지 상태 업데이트
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [themeKey]); // themeKey가 변경될 때마다 데이터 다시 불러옴

  if (isLoading) {
    return <Loading />; // 로딩 중일 때
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>; // 에러 발생 시
  }

  if (goodsList.length === 0) {
    return <EmptyMessage>선물 목록이 비어있습니다.</EmptyMessage>; // 상품 리스트가 비어있을 때
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 20px;
  padding: 20px;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 35px;
    padding: 30px;
  }
`;

const EmptyMessage = styled.p`
  color: #555;
  text-align: left;
  font-size: 20px;
  padding: 20px;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 35px;
    padding: 30px;
  }
`;
