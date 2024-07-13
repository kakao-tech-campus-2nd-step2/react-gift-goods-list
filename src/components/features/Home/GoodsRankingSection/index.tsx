import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { Container } from '@/components/common/layouts/Container';
import { Message } from '@/styles';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import { BASE_URL, type RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const fetchRankingList = async (filterOption: RankingFilterOption) => {
  const params = {
    targetType: filterOption.targetType,
    rankType: filterOption.rankType,
  };
  const { data } = await axios.get(`${BASE_URL}/api/v1/ranking/products`, { params });
  return data.products;
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, isLoading, isError } = useQuery<GoodsData[]>(['rankingList', filterOption], () =>
    fetchRankingList(filterOption),
  );

  const renderList = () => {
    if (isError) {
      return <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>;
    }
    if (isLoading) {
      return <Message>로딩 중...</Message>;
    }
    if (!data?.length) {
      return <Message>보여줄 상품이 없습니다!</Message>;
    }
    return <GoodsRankingList goodsList={data} />;
  };

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {renderList()}
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
