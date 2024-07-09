import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchData } from '@/components/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import Loading from '@/components/common/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [currentGoods, setCurrentGoods] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const maxResults = 20;
        const queryParams = `?maxResults=${maxResults}`;

        const data = await fetchData(`/api/v1/themes/${themeKey}/products${queryParams}`);
        setCurrentGoods(data.products);
      } catch (error) {
        console.error('Error fetching theme data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemeData();
  }, [themeKey]);

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      );
    }

    if (currentGoods.length === 0) {
      return <NoItemsMessage>상품이 없어요.</NoItemsMessage>;
    }

    return (
      <Grid
        columns={{
          initial: 2,
          md: 4,
        }}
        gap={16}
      >
        {currentGoods.map((goods) => (
          <DefaultGoodsItems
            key={goods.id}
            imageSrc={goods.imageURL}
            title={goods.name}
            amount={goods.price.sellingPrice}
            subtitle={goods.brandInfo.name}
          />
        ))}
      </Grid>
    );
  };

  return (
    <Wrapper>
      <Container>{renderContent()}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
