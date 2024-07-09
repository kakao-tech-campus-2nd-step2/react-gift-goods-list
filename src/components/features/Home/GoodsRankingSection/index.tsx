import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getRankingProducts } from '@/apis/products/products';
import type { ProductData } from '@/apis/products/type';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const defaultFilter: RankingFilterOption = {
  targetType: 'ALL',
  rankType: 'MANY_WISH',
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>(defaultFilter);
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    getRankingProducts(filterOption)
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => {
        /**
         * 서버 보니까 MALE & MANY_WISH_RECEIVE에 일부러 400 던지게 만듬
         */
        if (err.response.status === 400) {
          setProducts([]);
        } else {
          console.error(err);
        }
      });
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={products} />
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
