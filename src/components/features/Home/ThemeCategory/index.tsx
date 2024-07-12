import React from 'react';
import styled from '@emotion/styled';
import { ThemesResponse } from '@/types/responseTypes';
import { getThemes } from '@apis/themes';
import useFetch from '@hooks/useFetch';
import { Grid, CenteredContainer, StatusHanlder } from '@components/common';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@routes/path';
import { getDynamicPath } from '@utils/getDynamicPath';
import ThemeItem from './ThemeItem';

const GRID_GAP = 0;
const GRID_COLUMNS = 6;

export default function ThemeCategory() {
  const { isLoading, isError, data, error } = useFetch<ThemesResponse>(getThemes);

  const isEmpty = !data || data?.themes.length === 0;

  return (
    <ThemeCategoryContainer>
      <CenteredContainer maxWidth="md">
        <StatusHanlder isLoading={isLoading} isError={isError} isEmpty={isEmpty} error={error}>
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
        </StatusHanlder>
      </CenteredContainer>
    </ThemeCategoryContainer>
  );
}

const ThemeCategoryContainer = styled.section`
  padding-top: 45px;
  padding-bottom: 23px;
`;
