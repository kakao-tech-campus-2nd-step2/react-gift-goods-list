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
  const MaxItems = 20
  const queryParams = `?maxItems=${MaxItems}`

  // themeKey 가 변할 때마다 실행
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const data = await fetchData(`api/v1/themes/${themeKey}/products${queryParams}`)
        setCurrentGoods(data.products)
        console.log('[ThemeGoodsSection] Fetch Theme Goods Data Success: ', data.products)
      }
      catch (error) {
        console.error('[ThemeGoodsSection] Fetch Theme Goods Data Fail: ', error)
      }
    }
    fetchThemeData()
  }, [themeKey])
  

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
