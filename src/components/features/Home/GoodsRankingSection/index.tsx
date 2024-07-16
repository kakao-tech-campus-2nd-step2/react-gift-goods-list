import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { Container } from '@/components/common/layouts/Container';
import { Loader } from '@/components/common/Spinner';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';
import apiClient from '@/utils/api';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const getGoodsRanking = async (filterOption: RankingFilterOption) => {
  const { data } = await apiClient.get<{ products: GoodsData[] }>('/ranking/products', {
    params: filterOption,
  });
  return data.products;
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const {
    data: goodsList,
    isLoading,
    isError,
    error,
  } = useQuery(['goodsRanking', filterOption], () => getGoodsRanking(filterOption));

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404 ? '상품을 찾을 수 없습니다.' : '오류가 발생했습니다.';
    return <div>{errorMessage}</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {goodsList && goodsList.length > 0 ? (
          <GoodsRankingList goodsList={goodsList} />
        ) : (
          <div>상품이 없어요.</div>
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
