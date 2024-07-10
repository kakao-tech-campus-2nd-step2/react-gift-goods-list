import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import fetchData from '@/api'
import { Container } from '@/components/common/layouts/Container'
import { Grid } from '@/components/common/layouts/Grid'
import { getDynamicPath } from '@/routes/path'
import { breakpoints } from '@/styles/variants'

import { ThemeCategoryItem } from './ThemeCategoryItem'

interface Theme {
  id: number
  key: string
  label: string
  imageURL: string
  title: string
  description?: string
}

export const ThemeCategorySection = () => {
  const [themeFromAPI, setThemeFromAPI] = useState<Theme[]>([])

  // 최초 렌더링 시 한 번만 실행
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const data = await fetchData('api/v1/themes')
        setThemeFromAPI(data.themes)
        console.log('Fetch Theme Data Success: ', data.themes)
      }
      catch (error) {
        console.error('Fetch Theme Data Fail: ', error)
      }
    }
    fetchThemeData()
  }, [])
  
  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themeFromAPI.map((theme) => (
            // 각 Theme Detail Page로 이동할 링크
            <Link key={theme.id} to={getDynamicPath.theme(theme.key)} >
              <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
            </Link>  
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
