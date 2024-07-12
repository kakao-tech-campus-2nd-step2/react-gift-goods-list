import styled from '@emotion/styled';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary, useQueryClient } from 'react-query';

import { Container } from '@/components/common/layouts/Container';
import { GoodsRankingFilter } from '@/components/features/Home/GoodsRankingSection/Filter';
import { GoodsRankingList } from '@/components/features/Home/GoodsRankingSection/List';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

const defaultFilter: RankingFilterOption = {
  targetType: 'ALL',
  rankType: 'MANY_WISH',
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>(defaultFilter);
  const queryClient = useQueryClient();

  const handleFilterChange = (newFilterOption: RankingFilterOption) => {
    setFilterOption(newFilterOption);
    queryClient.invalidateQueries(['goodsRanking', newFilterOption]);
  };

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={handleFilterChange} />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={() => (
                <Container alignItems="center">
                  데이터를 불러오는 중에 문제가 발생했습니다.
                </Container>
              )}
            >
              <Suspense fallback={<Container alignItems="center">로딩중</Container>}>
                <GoodsRankingList filterOption={filterOption} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
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
