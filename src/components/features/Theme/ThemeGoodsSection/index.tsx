import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { fetchThemeProducts } from '@/apis/fetch';
// import useFetch from '@/apis/useFetch';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
  pageToken?: number;
};

interface GoodsDataArray {
  products: GoodsData[];
}

export const ThemeGoodsSection = ({ themeKey, pageToken }: Props) => {
  const {
    data = {
      products: [],
    },
    isError,
    isLoading,
  } = useQuery<GoodsDataArray>({
    queryKey: ['themeProducts', themeKey, pageToken],
    queryFn: () => fetchThemeProducts(themeKey, pageToken),
  });

  // const { data, status } = useFetch<GoodsDataArray>(
  //   `api/v1/themes/${themeKey}/products?maxResults=20`,
  //   { products: [] },
  // );
  const goodsItemsData = data.products;
  let currentStatus;
  if (isLoading) currentStatus = <StatusDiv>로딩중...</StatusDiv>;
  else if (isError) currentStatus = <StatusDiv>에러에러에러</StatusDiv>;
  else if (goodsItemsData.length === 0) currentStatus = <StatusDiv>상품이 없어요.</StatusDiv>;

  return (
    <Wrapper>
      <Container>
        {currentStatus}
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {goodsItemsData?.map(({ id, imageURL, name, price, brandInfo }) => (
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

const StatusDiv = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 16px 60px;
`;
