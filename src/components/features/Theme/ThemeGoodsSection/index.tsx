import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useCallback,useEffect, useState } from 'react';

import { fetchData } from '@/components/common/API/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import EmptyData from '@/components/common/Status/emptyData';
import ErrorMessage from '@/components/common/Status/errorMessage';
import Loading from '@/components/common/Status/loading';
import { breakpoints } from '@/styles/variants';

interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  price: {
    sellingPrice: number;
  };
  brandInfo: {
    name: string;
  };
}

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  errorCode?: string;
  errorMessage?: string;
  data: T;
}

type Props = {
  themeKey: string;
};

const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const [fetchState, setFetchState] = useState<FetchState<ProductData[]>>({
    isLoading: true,
    isError: false,
    data: [],

  });

  const fetchProducts = useCallback(async (key: string) => {
    try {
      const data = await fetchData(`/api/v1/themes/${key}/products?maxResults=20`);
      setFetchState({
        isLoading: false,
        isError: false,
        data: data.products,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      const axiosError = error as AxiosError;
      setFetchState({
        isLoading: false,
        isError: true,
        data: [],
        errorMessage: axiosError.message,
        errorCode: axiosError.code,
      });
      
    }
  }, []);

//초기 로딩 비동기 통신
  useEffect(() => {
    if (themeKey) {
      setFetchState({ isLoading: true, isError: false, data: []});
      fetchProducts(themeKey);  
    }
  }, [themeKey, fetchProducts]);

  if (fetchState.isLoading)
    return <Loading />;
  if (fetchState.isError)
    return <ErrorMessage code={fetchState.errorCode} message={fetchState.errorMessage || '데이터를 불러오는 중에 문제가 발생했습니다.'} />;
  if (!fetchState.data || fetchState.data.length === 0)
    return <EmptyData />;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {fetchState.data.map(({ id, imageURL, name, price, brandInfo }) => (
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

export default ThemeGoodsSection;