import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { ApiService } from '@/api';
import type { GetThemeProductsParameters, ProductData } from '@/api/types';
import type { APIError } from '@/api/types';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { ErrorMessage } from '@/components/features/Error/ErrorMessage';
import { Loading } from '@/components/features/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import { handleApiError } from '@/utils/errorHandler/errorHandler';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goodsList, setGoodsList] = useState<ProductData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: GetThemeProductsParameters = { themeKey, maxResults: 20 };
    const fetchGoodsList = async () => {
      setIsLoading(true);

      try {
        const response = await ApiService.fetchThemeProducts(params);
        setGoodsList(response.products);
      } catch (error) {
        if (error as APIError) {
          setErrorMessage(handleApiError(error as APIError));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoodsList();
  }, [themeKey]);

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (isLoading) {
    return <Loading message="로딩 중" />;
  }

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
