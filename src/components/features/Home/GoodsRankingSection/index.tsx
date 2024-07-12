import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/api'; // API 함수와 타입 가져오기
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
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 관리

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터 가져오기 전에 로딩 상태 설정
      try {
        const data = await fetchRankingProducts(filterOption, setError); // API 호출로 상품 랭킹 데이터를 가져옴
        if (data) {
          setGoodsList(data.products); // 가져온 상품 데이터를 상태에 설정
        }
      } catch (err) {
        console.error(err);
        setError('선물 랭킹 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
      } finally {
        setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
      }
    };

    fetchData();
  }, [filterOption]); // filterOption이 변경될 때마다 데이터 다시 불러오기

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <Loading /> // 데이터 로딩 중일 때 로딩 컴포넌트 표시
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage> // 에러 발생 시 에러 메시지 표시
        ) : goodsList.length === 0 ? (
          <EmptyMessage>선물 목록이 비어있습니다.</EmptyMessage> // 상품 리스트가 비어있을 때
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
  text-align: left;
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
