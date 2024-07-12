import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';
import { useGetRankingGoods } from '@/api/hooks/useGetRankingGoods';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const queryClient = useQueryClient();
  
  const { data, isLoading, isError } = useGetRankingGoods(filterOption);

  const RenderGoodsRankingList = useCallback(() => {
    if (isError) {
      return <ErrorView>데이터를 불러오는 중에 문제가 발생했습니다.</ErrorView>;
    }

    if (isLoading) {
      return <LoadingView>로딩 중...</LoadingView>;
    }

    if (!data || data.length === 0) {
      return <NoDataView>데이터가 없습니다.</NoDataView>;
    }

    return <GoodsRankingList goodsList={data} />;
  }, [isLoading, data, isError]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter
          filterOption={filterOption}
          onFilterOptionChange={(newFilterOption) => {
            setFilterOption(newFilterOption);
            queryClient.invalidateQueries('rankingGoods');
          }}
        />
        <RenderGoodsRankingList />
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

const ErrorView = styled.div`
  color: red;
`;

const LoadingView = styled.div`
  color: gray;
`;

const NoDataView = styled.div`
  color: #888;
`;
