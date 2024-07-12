import styled from '@emotion/styled';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { EmptyMessage, ErrorMessage } from '@/components/common/Error/Error';
import { Container } from '@/components/common/layouts/Container';
import { LoadingMessage } from '@/components/common/Loading/Loading';
import { getRankingProducts } from '@/libs/api';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [isEmpty, setIsEmpty] = useState(false);
  const [errorState, setErrorState] = useState('');

  const {
    data: rankingData, // API에서 불러온 데이터는 이 객체에 저장됩니다.

    isLoading,
    isFetching,
    refetch,
  } = useQuery(['rankingProducts', filterOption], () => getRankingProducts(filterOption), {
    keepPreviousData: true,

    onSuccess: (data) => {
      // data가 유효한지 확인
      if (data || data.products) {
        console.log(data);
        setErrorState('');
        if (typeof data === 'string') {
          setErrorState(data);
        } else {
          setIsEmpty(data.products.length === 0);
        }
      } else {
        setIsEmpty(true);
      }
    },
    onError: (err) => {
      setErrorState((err as Error).message);
    },
  });

  const handleFilterChange = (newFilterOption: RankingFilterOption) => {
    setFilterOption(newFilterOption);
    refetch();
  };

  return (
    <Wrapper>
      <StyledContainer>
        <Container>
          <Title>실시간 급상승 선물랭킹</Title>
          <GoodsRankingFilter
            filterOption={filterOption}
            onFilterOptionChange={handleFilterChange}
          />
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
            <GoodsRankingList goodsList={rankingData?.products ?? []} />
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
