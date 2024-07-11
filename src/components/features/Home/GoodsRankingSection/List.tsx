import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  goodsList: GoodsData[];
};

export const GoodsRankingList = ({ goodsList }: Props) => {
  const [hasMore, setHasMore] = useState(false);

  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, 6);

  const renderContent = () => {
    if (goodsList.length === 0) {
      return <NoItemsMessage> 상품이 없어요. </NoItemsMessage>;
    }

    return (
      <>
        <Grid
          columns={{
            initial: 3,
            sm: 4,
            md: 6,
          }}
          gap={16}
        >
          {currentGoodsList.map(({ id, imageURL, name, price, brandInfo }, index) => (
            <RankingGoodsItems
              key={id}
              rankingIndex={index + 1}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
        <ButtonWrapper>
          <Button
            theme="outline"
            style={{ maxWidth: '480px' }}
            onClick={() => {
              setHasMore((prev) => !prev);
            }}
          >
            {hasMore ? '접기' : '더보기'}
          </Button>
        </ButtonWrapper>
      </>
    );
  };

  return (
    <Wrapper>
      <Container>{renderContent()}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0 30px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 0 60px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  padding-top: 30px;
`;

const NoItemsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #666;
  margin-top: 20px;
`;
