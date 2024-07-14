import styled from '@emotion/styled';
import { useState } from 'react';
import { useQuery } from 'react-query';

import axiosInstance from '@/api/axiosInstance';
import { Loading } from '@/api/Loading';
import { NoData } from '@/api/NoData';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { ProductData, RankingFilterOption } from '@/types';

import { RankingFilter } from './Filter';
import { RankingList } from './List';

const fetchRankingProducts = async (filterOption: RankingFilterOption) => {
  const response = await axiosInstance.get('/api/v1/ranking/products', {
    params: filterOption,
  });
  return response.data;
};

export const RankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, isLoading, error } = useQuery<{ products: ProductData[] }>(
    ['rankingProducts', filterOption],
    () => fetchRankingProducts(filterOption),
    { keepPreviousData: true },
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data || !Array.isArray(data.products) || data.products.length === 0) {
    return <NoData />;
  }

  const { products: productList } = data;

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <RankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <RankingList ProductList={productList} />
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
