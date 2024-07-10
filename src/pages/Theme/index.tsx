import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '@/components/features/Header';
import type { Products } from '@/entities/Product';
import type { ThemeData, Themes } from '@/entities/Theme';
import useGetData from '@/hooks/useGetData';

import DefaultList from './DefaultList';
import ThemeHeader from './ThemeHeader';

export default () => {
    const themeKey = useParams().themeKey ?? '';
    const products = useGetData<Products>(`/themes/${themeKey}/products?maxResults=20`);
    const themes = useGetData<Themes>('/themes');
    const [theme, setTheme] = useState<ThemeData>();
    const navigate = useNavigate();

    useEffect(() => {
        if (themes?.isLoading) {
        } else {
            const index = themes?.data?.themes.findIndex((_theme) => _theme.key == themeKey) ?? -1;
            if (index === -1) {
                navigate('/error/404');
            } else {
                setTheme(themes?.data?.themes[index]);
            }
        }
    }, [navigate, themes, themeKey]);

    return (
        <div>
            <Header />
            {/* theme header section */}
            <section>
                <ThemeHeader
                    label={theme?.label ?? ''}
                    title={theme?.title ?? ''}
                    description={theme?.description ?? ''}
                    backgroundColor={theme?.backgroundColor ?? '#000000'}
                />
            </section>
            {/* goods list */}
            <section
                className={css`
                    margin-top: 50px;
                    margin-bottom: 100px;
                `}
            >
                <DefaultList items={products?.data?.products ?? []} />
            </section>
        </div>
    );
};
