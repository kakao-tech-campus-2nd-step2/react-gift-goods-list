import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

import fetchData from '@/api'
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default'
import { Container } from '@/components/common/layouts/Container'
import { Grid } from '@/components/common/layouts/Grid'
import { breakpoints } from '@/styles/variants'
import type { GoodsData } from '@/types'

type Props = {
  themeKey: string
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [currentGoods, setCurrentGoods] = useState<GoodsData[]>([])
  const [loading, setLoading] = useState(true)

  // themeKey 가 변할 때마다 실행
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const MaxItems = 20
        const queryParams = `?maxItems=${MaxItems}`
        const data = await fetchData(`api/v1/themes/${themeKey}/products${queryParams}`)

        // 의도적으로 지연 시간을 추가
        setTimeout(() => {
          setCurrentGoods(data.products)
          setLoading(false)
          console.log('[ThemeGoodsSection] Fetch Theme Goods Data Success: ', data.products)
        }, 2000)
      }
      catch (error) {
        console.error('[ThemeGoodsSection] Fetch Theme Goods Data Fail: ', error)
        setLoading(false)
      }
    }
    fetchThemeData()
  }, [themeKey])

  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    )
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #555;
`;
