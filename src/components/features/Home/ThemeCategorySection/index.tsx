import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://pbs.twimg.com/tweet_video_thumb/EmoIlqoUcAE8mEB.jpg"
              label="생일"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202111/16/harmony/20211116170333853gwma.png"
              label="졸업선물"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://res.heraldm.com/content/image/2024/03/14/20240314050080_0.jpg"
              label="스몰럭셔리"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://news.nateimg.co.kr/orgImg/nn/2022/03/08/202203081720150810_1.jpg"
              label="명품선물"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://www.468.co.kr/file-download/2529899"
              label="결혼/집들이"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/3766881480/B.jpg?830000000"
              label="따뜻한선물"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://i.namu.wiki/i/jAc2PdvIVcNbRKU3rt2jRRXSJ82OO-ey_iL3mRCKWWCachnkhFHk6t3twXxo2Ie2ZI469PZT5ZziigyyFmqsKg.webp"
              label="가벼운선물"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202403/09/21e88381-7867-410a-b0c3-5d6c9cd430b1.jpg"
              label="팬심저격"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://mblogthumb-phinf.pstatic.net/MjAxNzAxMDZfMjg3/MDAxNDgzNjg1NzMyMTcy.QCjpMLV54_oRE4BD5g56_y0JIq7CWwqL_41Si36iDwQg.3DFFMoIyj185wzN1yAzgZhUMOvZ2R02xHZvUaQPEbRkg.JPEG.heehee2355/KakaoTalk_20161008_002218186.jpg?type=w800"
              label="교환권"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://i.namu.wiki/i/8nFYlZxRRCOKgWMtvdWGb7F_685htWm5_42oJau3v2FqfpxIPFPKHsfHOJQ0GxtOcHYLdQWZ0byotY6BOZeQog.webp"
              label="건강/비타민"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://mblogthumb-phinf.pstatic.net/MjAxOTA3MTVfMjA3/MDAxNTYzMTUzMjQ2NjQ3.IT05sGDl398zkoyCnHRdBSMruZmguS6hgUG_Mrmxl-0g.Z2tJ_U2RN5Enc4BjXVf_dyMCmWMwPeuKxb1DMr2xQEYg.JPEG.pma-edu/3.jpg?type=w800"
              label="과일/한우"
            />
          </Link>
          <Link to={getDynamicPath.theme('life_small_gift')}>
            <ThemeCategoryItem
              image="https://image.fmkorea.com/files/attach/new3/20230124/486616/2875519893/5427734174/99b983892094b5c6d2fc3736e15da7d1.jpg"
              label="출산/키즈"
            />
          </Link>
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
