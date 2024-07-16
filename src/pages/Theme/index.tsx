import { css } from '@emotion/css';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingUI from '@/components/common/LoadingUI';
import Header from '@/components/features/Header';
import type { Products } from '@/entities/Product';
import type { ThemeData, Themes } from '@/entities/Theme';
import useData from '@/hooks/useData';

import DefaultList from './DefaultList';
import ThemeHeader from './ThemeHeader';

export default () => {
    const themeKey = useParams().themeKey ?? '';
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <section>
                <ThemeHeaderRender themeKey={themeKey} navigate={navigate} />
            </section>
            <section
                className={css`
                    margin-top: 50px;
                    margin-bottom: 100px;
                `}
            >
                <ProductsRender themeKey={themeKey} navigate={navigate} />
            </section>
        </div>
    );
};

interface RenderProps {
    themeKey: string;
    navigate: NavigateFunction;
}

const ThemeHeaderRender = ({ themeKey, navigate }: RenderProps) => {
    const [theme, setTheme] = useState<ThemeData>();
    const themes = useData<Themes>('/themes');

    useEffect(() => {
        if (themes?.httpStatusCode !== 200)
            navigate(`/error/${themes?.httpStatusCode}/themes_${themeKey}`, { replace: true });
        if (themes?.isLoading) return;
        const thisTheme = themes?.data?.themes.find((_theme) => _theme.key == themeKey);
        if (!thisTheme) navigate('/error/404', { replace: true });

        setTheme(thisTheme);
    }, [navigate, themeKey, themes]);
    if (themes?.isLoading) {
        return (
            <ThemeHeader
                label="로딩 중..."
                title="로딩 중..."
                description="로딩 중..."
                backgroundColor="#000000"
            />
        );
    }
    return (
        <ThemeHeader
            label={theme?.label ?? ''}
            title={theme?.title ?? ''}
            description={theme?.description ?? ''}
            backgroundColor={theme?.backgroundColor ?? '#000000'}
        />
    );
};
const ProductsRender = ({ themeKey, navigate }: RenderProps) => {
    const { data, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<Products>({
        queryKey: ['productsByTheme', themeKey],
        queryFn: ({ pageParam }) =>
            axios
                .get(`/themes/${themeKey}/products?maxResults=20&pageToken=${pageParam}`)
                .then((res) => res.data),
        getNextPageParam: (lastPage) => lastPage.nextPageToken,
        initialPageParam: 0,
    });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (error) navigate(`/error/${error.name}/themes_${themeKey}`, { replace: true });

        if (!hasNextPage) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchNextPage();
            },
            { threshold: 1 },
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    }, [navigate, themeKey, error, hasNextPage, fetchNextPage]);

    if (isLoading) return <LoadingUI />;

    return (
        <div>
            {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                    <DefaultList items={page.products ?? []} />
                </React.Fragment>
            ))}
            <div ref={loadMoreRef}></div>
        </div>
    );
};
