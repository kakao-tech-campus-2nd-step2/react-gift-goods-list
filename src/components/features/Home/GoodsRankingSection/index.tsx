import styled from '@emotion/styled';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { fetchRankingProducts } from '@/api/ranking';
import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Message } from '@/components/common/Message';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [visibleProducts, setVisibleProducts] = useState(6);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(['rankingProducts', filterOption],
    () => fetchRankingProducts(filterOption)
  );

  const ShowMore = () => {
    if (products) setVisibleProducts(products.length);
  };

  const ShowLess = () => {
    setVisibleProducts(6);
  };

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading && <Message>로딩중</Message>}
        {isError && <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>}
        {products && products.length === 0 && <Message>보여줄 상품이 없어요!</Message>}
        <Grid
          columns={{
            initial: 3,
            sm: 4,
            md: 6,
          }}
          gap={16}
        >
          {products && products.slice(0, visibleProducts).map((product, index) => (
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
        {products && products.length > 6 && (
          <Container padding='30px 0 0 0'>
            {visibleProducts <= 6 ? (
              <Button
                theme='outline'
                size='responsive'
                onClick={ShowMore}
              >
                더보기
              </Button>
            ) : (
              <Button
                theme='outline'
                size='responsive'
                onClick={ShowLess}
              >
                접기
              </Button>
            )}
          </Container>
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
