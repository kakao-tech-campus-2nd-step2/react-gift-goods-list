import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { Error } from '@/components/common/Error';
import { Container } from '@/components/common/layouts/Container';
import { LoadingIcon } from '@/components/common/LoadingIcon';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import { type RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const fetchGoodsRanking = async () => {
    const response = await axios.get(process.env.REACT_APP_API_KEY + `/api/v1/ranking/products`, {
      params: { targetType: filterOption.targetType, rankType: filterOption.rankType },
    });
    return response.data.products;
  };

  const { data, error, isLoading } = useQuery<GoodsData[]>({
    queryKey: ['products', filterOption.targetType, filterOption.rankType],
    queryFn: fetchGoodsRanking,
  });

  const GoodsRanking = () => {
    if (data) {
      if (data.length > 0) {
        return <GoodsRankingList goodsList={data} />;
      } else {
        return <Error>보여줄 페이지가 없습니다!</Error>;
      }
    } else if (error) {
      return <Error>에러가 발생했습니다.</Error>;
    } else if (isLoading) {
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
