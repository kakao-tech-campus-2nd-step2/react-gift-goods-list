import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import { type GoodsData, type RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [goods, setGoods] = useState<GoodsData[]>([]);

  const url = 'https://react-gift-mock-api-two.vercel.app/api/v1/ranking/products';
  useEffect(() => {
    axios({
      method: 'get',
      url: url,
      params: filterOption,
    }).then((res) => {
      setGoods(res.data.products);
    });
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={goods} />
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
