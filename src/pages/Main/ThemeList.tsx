import { css } from '@emotion/css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Image } from '@/components/common/Image';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import LoadingUI from '@/components/common/LoadingUI';
import type { Themes } from '@/entities/Theme';
import useData from '@/hooks/useData';

export default () => {
    const themes = useData<Themes>('/themes');
    const navigate = useNavigate();
    useEffect(() => {
        if (themes?.httpStatusCode !== 200)
            navigate('/error/' + themes?.httpStatusCode + '/main_themeList', { replace: true });
    }, [themes?.httpStatusCode, navigate]);

    if (themes?.isLoading) return <LoadingUI />;
    return (
        <Grid columns={{ initial: 2, xs: 4, sm: 4, md: 6 }}>
            {themes?.data?.themes.map((theme) => (
                <ThemeButton
                    key={theme.id}
                    themeKey={theme.key}
                    themeLabel={theme.label}
                    themeImg={theme.imageURL}
                />
            ))}
        </Grid>
    );
};

const ThemeButton = ({
    themeKey,
    themeLabel,
    themeImg,
}: {
    themeKey: string;
    themeLabel: string;
    themeImg: string;
}) => {
    const divStyle = css`
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 15px;
        img {
            max-width: 90px;
            margin-bottom: 8px;
        }
        padding: 20px 0px;
    `;
    return (
        <Container>
            <Link className={divStyle} to={`/theme/${themeKey}`}>
                <Image radius={30} ratio="square" alt={themeKey} src={themeImg} />
                <p>{themeLabel}</p>
            </Link>
        </Container>
    );
};
