import { css } from '@emotion/css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingUI from '@/components/common/LoadingUI';
import Header from '@/components/features/Header';
import type { Products } from '@/entities/Product';
import type { ThemeData, Themes } from '@/entities/Theme';
import useData from '@/hooks/useData';

import DefaultList from './DefaultList';
import ThemeHeader from './ThemeHeader';
// useQuery(['todos', id], () => axios.get(`http://.../${id}`));
export default () => {
    const themeKey = useParams().themeKey ?? '';
    const { data, isLoading, error } = useQuery<Products>({
        queryKey: ['productsByTheme', themeKey],
        queryFn: () =>
            axios.get(`/themes/${themeKey}/products?maxResults=20`).then((res) => res.data),
    });
    const themes = useData<Themes>('/themes');
    const [theme, setTheme] = useState<ThemeData>();
    const navigate = useNavigate();

    useEffect(() => {
        if (themes?.httpStatusCode !== 200)
            navigate(`/error/${themes?.httpStatusCode}/themes_${themeKey}`, { replace: true });
        if (error) navigate(`/error/${error.name}/themes_${themeKey}`, { replace: true });
        if (themes?.isLoading) return;
        const index = themes?.data?.themes.findIndex((_theme) => _theme.key == themeKey) ?? -1;
        if (index === -1) navigate('/error/404', { replace: true });

        setTheme(themes?.data?.themes[index]);
    }, [navigate, themes, themeKey, error]);

    return (
        <div>
            <Header />
            {/* theme header section */}
            <section>
                {themes?.isLoading ? (
                    <ThemeHeader
                        label="로딩 중..."
                        title="로딩 중..."
                        description="로딩 중..."
                        backgroundColor="#000000"
                    />
                ) : (
                    <ThemeHeader
                        label={theme?.label ?? ''}
                        title={theme?.title ?? ''}
                        description={theme?.description ?? ''}
                        backgroundColor={theme?.backgroundColor ?? '#000000'}
                    />
                )}
            </section>
            {/* goods list */}
            <section
                className={css`
                    margin-top: 50px;
                    margin-bottom: 100px;
                `}
            >
                {isLoading ? <LoadingUI /> : <DefaultList items={data?.products ?? []} />}
            </section>
        </div>
    );
};
