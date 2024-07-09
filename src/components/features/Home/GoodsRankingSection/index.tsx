import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/ranking';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';
import type { ProductData } from '@/types/api';

import { GoodsRankingFilter } from './Filter';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const getRankingProducts = async () => {
      const productsData = await fetchRankingProducts(filterOption);
      setProducts(productsData);
    };

    getRankingProducts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <Grid
        columns={{
          initial: 3,
          sm: 4,
          md: 6,
        }}
        gap={16}
        >
          {products.map((product, index) => (
            <RankingGoodsItems
              key={product.id}
              rankingIndex={index + 1}
              imageSrc={product.imageURL}
              title={product.name}
              amount={product.price.sellingPrice}
              subtitle={product.brandInfo.name}
            />
          ))}
        </Grid>
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
