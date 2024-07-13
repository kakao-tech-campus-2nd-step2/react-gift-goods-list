import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useThemes } from '@/api/theme';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection: React.FC = () => {
    const { data: themes, error, isLoading } = useThemes();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>테마를 불러오는 중 오류가 발생했습니다.</div>;
    if (!themes) return <div>테마가 없습니다.</div>;

    return (
        <Wrapper>
            <Container>
                <Grid
                    columns={{
                        initial: 4,
                        md: 6,
                    }}
                >
                    {themes.themes.map((theme) => (
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
