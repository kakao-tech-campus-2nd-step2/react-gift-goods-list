import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axiosInstance from '@/api/axiosInstance';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

type Theme = {
  key: string;
  imageURL: string;
  label: string;
}

export const ThemeCategorySection = () => {

  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTheme = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.get('/api/v1/themes')
      setThemes(response.data.themes)
    } catch(err) {
      console.error(err)
      setError('themes를 fetch하는데 실패함')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTheme()
  }, [])

  if (loading)
    return (
      <div>Loading...</div>
    )
  
  if (error)
    return (
      <div>{error}</div>
  )

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes.map((theme) => (
            <Link key={theme.key} to={getDynamicPath.theme(theme.key)}>
              <ThemeCategoryItem
                image={theme.imageURL}
                label={theme.label}
              />
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
