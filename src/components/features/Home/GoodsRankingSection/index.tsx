import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { fetchRankingProducts } from '@/api/fetchRankingProducts';
import { FetchDataUI } from '@/components/common/FetchDataUI';
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

  const fetchData = useCallback(() => {
    return fetchRankingProducts(filterOption.targetType, filterOption.rankType);
  }, [filterOption]);

  const { data, error, isLoading } = useQuery<GoodsData[]>({
    queryKey: ['rankingProducts', filterOption],
    queryFn: fetchData,
  });

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <FetchDataUI loading={isLoading} error={error ? error.message : null} data={data || []}>
          <GoodsRankingList goodsList={data || []} />
        </FetchDataUI>
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
