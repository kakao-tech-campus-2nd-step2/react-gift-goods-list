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
  const [loading, setLoading] = useState(true)

  // 최초 렌더링 시 한 번만 실행
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const data = await fetchData('api/v1/themes')

        // 의도적으로 지연 시간을 추가
        setTimeout(() => {
          setThemeFromAPI(data.themes)
          setLoading(false)
          console.log('[ThemeCategorySection] Fetch Theme Data Success: ', data.themes)
        }, 2000) 
      }
      catch (error) {
        console.error('[ThemeCategorySection] Fetch Theme Data Fail: ', error)
        setLoading(false) 
      }
    }
    fetchThemeData()
  }, [])
  
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
