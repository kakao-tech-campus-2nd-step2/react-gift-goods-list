import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { axiosInstance } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

type ProductResponse = {
  products: GoodsData[];
  nextPageToken?: string;
};

const fetchThemeProducts = async ({
  themeKey,
  pageParam,
}: {
  themeKey: string;
  pageParam?: number;
}) => {
  const maxResults = 20;
  const params = { maxResults, pageToken: pageParam };
  if (pageParam) {
    params.pageToken = pageParam;
  }
  try {
    const response = await axiosInstance.get(`/api/v1/themes/${themeKey}/products`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { inView, ref } = useInView();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ProductResponse>(
      ['themeProducts', themeKey],
      async ({ pageParam = '0' }) => fetchThemeProducts({ pageParam, themeKey }),
      {
        getNextPageParam: (lastPage: ProductResponse) => lastPage.nextPageToken ?? false,
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const renderContent = () => {
    if (isLoading) return <Description>로딩 중</Description>;
    if (isError) return <Description>에러가 발생했습니다.</Description>;
    if (!data || data.pages.length === 0) return <Description>상품이 없어요.</Description>;
    return (
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {data?.pages.map((page) =>
            page.products.map((goods: GoodsData) => (
              <DefaultGoodsItems
                key={goods.id}
                imageSrc={goods.imageURL}
                title={goods.name}
                amount={goods.price.sellingPrice}
                subtitle={goods.brandInfo.name}
              />
            )),
          )}
        </Grid>
        <div ref={ref}>{isFetchingNextPage ? '로딩 중' : ''}</div>
      </Container>
    );
  };

  return <Wrapper>{renderContent()}</Wrapper>;
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
