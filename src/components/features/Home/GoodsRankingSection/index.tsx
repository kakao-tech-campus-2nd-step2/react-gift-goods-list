import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { Loading } from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수
  const [error, setError] = useState<string | null>(null); // 에러 메시지를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRankingProducts(filterOption); // API 호출로 상품 랭킹 데이터를 가져옴
        setGoodsList(data.products); // 상품 데이터를 상태에 설정
        setError(null); // 에러 상태 초기화
      } catch (err) {
        console.error(err);
        setError('Failed to fetch ranking products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterOption]); // 필터 옵션이 변경될 때마다 데이터를 다시 불러옴

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <Loading /> // 로딩 중일 때 로딩 컴포넌트 표시
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <GoodsRankingList goodsList={goodsList} /> // 상품 랭킹 리스트 표시
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;
  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 16px 80px;
  }
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  @media screen and (min-width: ${breakpoints.sm}) {
    text-align: center;
    font-size: 35px;
    line-height: 50px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 16px;
  padding: 20px;
`;
