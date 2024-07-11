import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Error } from '@/components/common/Error';
import { Container } from '@/components/common/layouts/Container';
import { LoadingIcon } from '@/components/common/LoadingIcon';
import { breakpoints } from '@/styles/variants';
import type { FetchState } from '@/types';
import { type GoodsData, type RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [fetchState, setFetchState] = useState<FetchState<GoodsData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });
  useEffect(() => {
    const fetchGoodsRanking = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_KEY + `/api/v1/ranking/products`,
          { params: { targetType: filterOption.targetType, rankType: filterOption.rankType } },
        );
        setFetchState({
          isLoading: false,
          isError: false,
          data: response.data.products,
        });
      } catch {
        setFetchState({
          isLoading: false,
          isError: true,
          data: null,
        });
      }
    };
    fetchGoodsRanking();
  }, [filterOption]);

  const GoodsRanking = () => {
    if (fetchState.data) {
      if (fetchState.data.length > 0) {
        return <GoodsRankingList goodsList={fetchState.data} />;
      } else {
        return <Error>보여줄 페이지가 없습니다!</Error>;
      }
    } else if (fetchState.isError) {
      return <Error>에러가 발생했습니다.</Error>;
    } else {
      return <LoadingIcon />;
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {GoodsRanking()}
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
