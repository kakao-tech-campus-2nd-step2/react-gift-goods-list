import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/ranking';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
// import { Loading } from '@/components/common/Loading';
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
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getRankingProducts = async () => {
      setLoading(true);
      setIsError(false);

      try {
        const productsData = await fetchRankingProducts(filterOption);
        setProducts(productsData);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    getRankingProducts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {loading && <Message>로딩중</Message>}
        {!loading && isError && <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>}
        {!loading && !isError && products.length === 0 && <Container><Message>보여줄 상품이 없어요!</Message></Container>}
        <Grid
          columns={{
            initial: 3,
            sm: 4,
            md: 6,
          }}
          gap={16}
        >
          {!loading && !isError && products.map((product, index) => (
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

const Message = styled.div`
  width: 100%;
  padding: 60px 0;
  text-align: center;
  font-size: 20px;
`;
