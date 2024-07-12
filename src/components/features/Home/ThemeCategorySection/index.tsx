import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getThemes } from '@/api';
import { Image } from '@/components/common/Image';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes';
import { ErrorMessageContainer } from '@/styles';
import { ThemeData } from '@/types';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await getThemes();
        setThemes(data.themes);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;
  if (isError) return <ErrorMessageContainer>에러가 발생했습니다.</ErrorMessageContainer>;

  return (
    <StyledThemeCategorySection>
      <div>
        <Container>
          <Grid columns={4}>
            {themes.map((theme) => (
              <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
                <ThemeCategoryItem>
                  <CategoryImage src={theme.imageURL} alt={theme.label} />
                  <CategoryTitle>{theme.label}</CategoryTitle>
                </ThemeCategoryItem>
              </Link>
            ))}
          </Grid>
        </Container>
      </div>
    </StyledThemeCategorySection>
  );
};

const StyledThemeCategorySection = styled.div`
  padding: 14px 14px 3px;
`;

const ThemeCategoryItem = styled.div`
  width: 100%;
  padding: 13px 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CategoryImage = styled(Image)`
  width: 100%;
  height: 100%;
  max-width: 50px;
  max-height: 50px;
  border-radius: 18px;
`;

const CategoryTitle = styled.p`
  padding-top: 5px;
  font-size: 13px;
  line-height: 17px;
  color: #333;
`;
