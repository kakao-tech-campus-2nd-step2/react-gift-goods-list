import styled from '@emotion/styled';
import { useEffect } from 'react';

import { EmptyMessage, ErrorMessage } from '@/components/common/Error/Error';
import { Container } from '@/components/common/layouts/Container';
import { LoadingMessage } from '@/components/common/Loading/Loading';
import { useRankingProductFilter } from '@/hooks/useRankingProductFilter';
import { useRankingProducts } from '@/hooks/useRankingProducts';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from '../../Home/GoodsRankingSection/Filter';
import { GoodsRankingList } from '../../Home/GoodsRankingSection/List';

export const GoodsRankingSection = () => {
  const { filterOption, changeFilter } = useRankingProductFilter({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const { data, isLoading, isFetching, isEmpty, errorState, refetch } =
    useRankingProducts(filterOption);

  useEffect(() => {
    refetch();
  }, [filterOption, refetch]);

  const filterChange = (newFilterOption: RankingFilterOption) => {
    changeFilter(newFilterOption);
  };

  return (
    <Wrapper>
      <StyledContainer>
        <Container>
          <Title>실시간 급상승 선물랭킹</Title>
          <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={filterChange} />
          {isLoading || isFetching ? (
            <CenteredContent>
              <LoadingMessage />
            </CenteredContent>
          ) : isEmpty ? (
            <CenteredContent>
              <EmptyMessage />
            </CenteredContent>
          ) : errorState ? (
            <CenteredContent>
              <ErrorMessage message={errorState} />
            </CenteredContent>
          ) : (
            <GoodsRankingList goodsList={data?.products ?? []} />
          )}
        </Container>
      </StyledContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;
  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 16px 80px;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
`;

export default GoodsRankingSection;
