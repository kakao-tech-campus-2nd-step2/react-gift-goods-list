import styled from '@emotion/styled';
import axios from 'axios';
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
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 400:
              setError('잘못된 요청입니다.');
              break;
            case 401:
              setError('인증이 필요합니다.');
              break;
            case 404:
              setError('리소스를 찾을 수 없습니다.');
              break;
            case 500:
              setError('서버 오류가 발생했습니다.');
              break;
            default:
              setError('알 수 없는 오류가 발생했습니다.');
          }
        } else {
          setError('네트워크 오류가 발생했습니다.');
        }
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
