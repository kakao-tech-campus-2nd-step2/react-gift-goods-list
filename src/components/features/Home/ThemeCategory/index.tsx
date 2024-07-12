import React from 'react';
import styled from '@emotion/styled';
import { ThemesResponse } from '@/types/responseTypes';
import { getThemes } from '@apis/themes';
import useFetch from '@hooks/useFetch';
import { Grid, CenteredContainer, Spinner, ErrorMessage } from '@components/common';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@routes/path';
import { getDynamicPath } from '@utils/getDynamicPath';
import ThemeItem from './ThemeItem';

const GRID_GAP = 0;
const GRID_COLUMNS = 6;
const ERROR_MESSAGE = '데이터를 불러오는 중에 문제가 발생했습니다.';

export default function ThemeCategory() {
  const { isLoading, isError, data } = useFetch<ThemesResponse>(getThemes);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={ERROR_MESSAGE} />;

  return (
    <ThemeCategoryContainer>
      <CenteredContainer maxWidth="md">
        <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
          {data?.themes.map((theme) => (
            <Link
              key={theme.id}
              to={getDynamicPath(ROUTE_PATH.THEME, { themeKey: theme.key })}
              state={{
                backgroundColor: theme.backgroundColor,
                label: theme.label,
                title: theme.title,
                description: theme.description,
              }}
            >
              <ThemeItem image={theme.imageURL} label={theme.label} />
            </Link>
          ))}
        </Grid>
      </CenteredContainer>
    </ThemeCategoryContainer>
  );
}

const ThemeCategoryContainer = styled.section`
  padding-top: 45px;
  padding-bottom: 23px;
`;
