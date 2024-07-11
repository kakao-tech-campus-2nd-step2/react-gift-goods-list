import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from '../../Home/GoodsRankingSection/Filter';

const initialFilterOption: RankingFilterOption = {
  targetType: 'ALL',
  rankType: 'MANY_WISH',
};

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection: React.FC<Props> = ({}) => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterOption, setFilterOption] = useState<RankingFilterOption>(initialFilterOption);

  useEffect(() => {
    const loadRankingProducts = async () => {
      try {
        const response = await fetchRankingProducts(filterOption.targetType, filterOption.rankType);
        setGoodsList(response.products);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage('Failed to load ranking products');
        setIsLoading(false);
      }
    };

    loadRankingProducts();
  }, [filterOption]);

  const handleFilterOptionChange = (option: RankingFilterOption) => {
    setFilterOption(option);
    setIsLoading(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Wrapper>
      <Container>
        <GoodsRankingFilter
          filterOption={filterOption}
          onFilterOptionChange={handleFilterOptionChange}
        />
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {goodsList.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
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
