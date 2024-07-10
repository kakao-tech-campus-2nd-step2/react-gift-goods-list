import styled from '@emotion/styled';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';

import { useGetRankingProductQuery } from '@/apis/tanstackQuery/ranking/query';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

// import { GoodsMockList } from '@/types/mock';
import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data: rankingProducts, isLoading, isError } = useGetRankingProductQuery(filterOption);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <LoadingStatus>
            <Oval
              visible={true}
              height="30"
              width="30"
              color="#000"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </LoadingStatus>
        ) : isError ? (
          <LoadingStatus>Something Goes Run!</LoadingStatus>
        ) : (
          <GoodsRankingList goodsList={rankingProducts?.products || []} />
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

const LoadingStatus = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;
