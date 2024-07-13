import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchThemes } from '@/api/theme';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types/api';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection: React.FC = () => {
    const [themes, setThemes] = useState<ThemeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const getThemes = async () => {
            try {
                const response = await fetchThemes();
                setThemes(response.themes);
            } catch (err) {
                setFetchError('Failed to fetch themes');
            } finally {
                setLoading(false);
            }
        };

        getThemes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (fetchError) return <div>{fetchError}</div>;

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
                        <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
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
