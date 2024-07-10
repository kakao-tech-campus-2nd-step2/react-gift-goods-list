import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/themes';
import type { ThemeData } from '@/types';

const Header = () => {
  const { themeKey } = useParams<{ themeKey: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeData | null>(null);

  useEffect(() => {
    const getThemes = async () => {
      try {
        const { themes } = await fetchThemes();
        const selectedTheme = themes.find(t => t.key === themeKey);

        if (selectedTheme) {
          setTheme(selectedTheme);
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    };

    getThemes();
  }, [themeKey, navigate]);

  if (!theme) return <div>Loading...</div>;

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

export default Header;
