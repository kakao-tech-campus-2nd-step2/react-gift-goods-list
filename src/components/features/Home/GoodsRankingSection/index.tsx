import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getRankingGoods } from '@/api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection: React.FC = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 변수 이름 변경

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        setErrorMessage(null);
        const data = await getRankingGoods(filterOption);
        setGoodsList(data);
      } catch (err) { 
        setErrorMessage('데이터를 불러오는데 실패하였습니다.');
      }
    };

    fetchGoods();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {errorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : (
          <GoodsRankingList goodsList={goodsList} />
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

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
