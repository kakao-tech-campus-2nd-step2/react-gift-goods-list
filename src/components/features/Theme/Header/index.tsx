import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/themes';
import type { ThemeData } from '@/types';

const Header = () => {
  const { themeKey } = useParams<{ themeKey: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getThemes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { themes } = await fetchThemes();
        const selectedTheme = themes.find(t => t.key === themeKey);

        if (selectedTheme) {
          setTheme(selectedTheme);
        } else {
          navigate('/');
        }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        setError('Failed to fetch themes');
      } finally {
        setIsLoading(false);
      }
    };

    getThemes();
  }, [themeKey, navigate]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!theme) {
    return <NoData>No theme found</NoData>;
  }

  return (
    <HeaderWrapper backgroundColor={theme.backgroundColor}>
      <h1>{theme.title}</h1>
      <p>{theme.description}</p>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ backgroundColor: string }>`
  padding: 20px;
  background-color: ${props => props.backgroundColor};
  text-align: center;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  font-size: 18px;
`;

const NoData = styled.div`
  text-align: center;
  font-size: 18px;
`;

export default Header;
