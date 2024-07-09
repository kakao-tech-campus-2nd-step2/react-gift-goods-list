import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ThemeCategoryItem } from './ThemeCategoryItem';
import { getThemes } from '@/apis/Theme/theme.api';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import styled from '@emotion/styled';

interface ThemeItem {
  id: number;
  key: string;
  label: string;
  imageURL: string;
  title: string;
  description?: string;
  backgroundColor: string;
}
export const ThemeCategorySection = () => {
  const [themeData, setThemeData] = useState<ThemeItem[]>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await getThemes();
        if (Array.isArray(data.themes)) {
          setThemeData(data.themes);
        } else {
          console.error('Data is not an array:', data.themes);
        }
      } catch (error) {
        console.error(`Failed to fetch themes: ${error}`);
      }
    };

    fetchThemes();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themeData.map((data) => (
            <Link to={getDynamicPath.theme(data.key)} key={data.id}>
              <ThemeCategoryItem image={data.imageURL} label={data.label} />
            </Link>
          ))}
          {/* <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='생일'
            />
          </Link> */}
          {/* <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='졸업선물'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='스몰럭셔리'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='명품선물'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='결혼/집들이'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='따뜻한선물'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='가벼운선물'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='팬심저격'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='교환권'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='건강/비타민'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='과일/한우'
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image='https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png'
              label='출산/키즈'
            />
          </Link> */}
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
