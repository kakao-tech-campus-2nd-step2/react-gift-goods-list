import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { getRankingProducts } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchRankingProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getRankingProducts(filterOption.targetType, filterOption.rankType);
      if (response.products.length === 0) {
        setErrorMessage('상품이 없습니다.');
      } else {
        setGoodsList(response.products);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 404:
            setErrorMessage('데이터를 찾을 수 없습니다.');
            break;
          case 500:
            setErrorMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            break;
          default:
            setErrorMessage('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        setErrorMessage('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [filterOption]);

  useEffect(() => {
    fetchRankingProducts();
  }, [fetchRankingProducts, filterOption]);

  const GoodRankingListView = useCallback(() => {
    if (errorMessage) {
      return <TextView>{errorMessage}</TextView>;
    }
    if (isLoading) {
      return (
        <LoadingContainer>
          <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
          <LoadingText>로딩중</LoadingText>
        </LoadingContainer>
      );
    }
    return <GoodsRankingList goodsList={goodsList} />;
  }, [isLoading, goodsList, errorMessage]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodRankingListView />
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

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #36d7b7;
`;
