import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { EmptyMessage, ErrorMessage } from '@/components/common/Error/Error';
import { Container } from '@/components/common/layouts/Container';
import { LoadingMessage } from '@/components/common/Loading/Loading';
import { getRankingProducts } from '@/libs/api';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchRankingProducts = useCallback(async (filter: RankingFilterOption) => {
    setLoading(true);
    setError('');
    const data = await getRankingProducts({
      targetType: filter.targetType,
      rankType: filter.rankType,
    });
    if (typeof data === 'string') {
      setError(data);
    } else {
      setGoodsList(data.products);
      setIsEmpty(data.products.length === 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRankingProducts(filterOption);
  }, [fetchRankingProducts, filterOption]);

  return (
    <Wrapper>
      <StyledContainer>
        <Container>
          <Title>실시간 급상승 선물랭킹</Title>
          <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
          {loading ? (
            <CenteredContent>
              <LoadingMessage />
            </CenteredContent>
          ) : isEmpty ? (
            <CenteredContent>
              <EmptyMessage />
            </CenteredContent>
          ) : error != '' ? (
            <CenteredContent>
              <ErrorMessage message={error} />
            </CenteredContent>
          ) : (
            <GoodsRankingList goodsList={goodsList} />
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
