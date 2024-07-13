import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
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
                <ThemeHeaderRander themeKey={themeKey} navigate={navigate} />
            </section>
            <section
                className={css`
                    margin-top: 50px;
                    margin-bottom: 100px;
                `}
            >
                <ProductsRander themeKey={themeKey} navigate={navigate} />
            </section>
        </div>
    );
};

interface RanderProps {
    themeKey: string;
    navigate: NavigateFunction;
}

const ThemeHeaderRander = ({ themeKey, navigate }: RanderProps) => {
    const [theme, setTheme] = useState<ThemeData>();
    const themes = useData<Themes>('/themes');

    useEffect(() => {
        if (themes?.httpStatusCode !== 200)
            navigate(`/error/${themes?.httpStatusCode}/themes_${themeKey}`, { replace: true });
        if (themes?.isLoading) return;
        const index = themes?.data?.themes.findIndex((_theme) => _theme.key == themeKey) ?? -1;
        if (index === -1) navigate('/error/404', { replace: true });

        setTheme(themes?.data?.themes[index]);
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
const ProductsRander = ({ themeKey, navigate }: RanderProps) => {
    const products = useData<Products>(`/themes/${themeKey}/products?maxResults=20`);
    useEffect(() => {
        if (products?.httpStatusCode !== 200)
            navigate(`/error/${products?.httpStatusCode}/themes_${themeKey}`, { replace: true });
    }, [navigate, themeKey, products?.httpStatusCode]);

    if (products?.isLoading) return <LoadingUI />;

    return <DefaultList items={products?.data?.products ?? []} />;
};
