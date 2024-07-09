# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## project structure

- `src/`: 소스 코드가 위치하는 디렉토리입니다. 주요 하위 디렉토리 및 파일은 다음과 같습니다.
  - `components/`: 재사용 가능한 컴포넌트들이 위치하는 디렉토리입니다.
    - `common/`: 공통 컴포넌트들이 위치하는 디렉토리입니다.
    - `features/`: 푸터 및 헤더 컴포넌트 등이 위치하는 디렉토리입니다.
  - `context/`: 상태 관리 로직이 위치하는 디렉토리입니다.
  - `pages/`: 각 페이지 컴포넌트들이 위치하는 디렉토리입니다. 로그인, 메인 페이지 등이 포함됩니다.
  - `styles/`: 전역 스타일 및 CSS 변수가 정의된 파일들이 위치하는 디렉토리입니다.
  - `App.tsx`, `index.tsx`: 애플리케이션의 진입점 및 루트 컴포넌트 파일입니다.

## 요구사항

- entities 추가
  - [x] `components.schemas.ThemeData`
  - [x] `conponents.schemas.ProductData`
- [x] 메인페이지-테마 카테고리 섹션: `/api/v1/themes`로부터 데이터를 받아 랜더링
  - res
    - themes: ThemeData array
- [x] 메인페이지-실시간 급상승 선물랭킹 섹션: `/api/v1/ranking/products/..query params..`
  - query params: targetType, rankType
  - res
    - products: ProductData array
- [ ] themePage-header: `/api/v1/themes`
- [ ] themePage-상품목록: `/api/v1/themes/{themeKey}/products`
  - path params: themeKey
  - query params
    - pageToken: 목록 불러오기에 사용할 페이지 토큰
    - maxResults
  - res
    - products: ProdectDtat array
    - nextPageToken
    - pageInfo: totalResults, resultsPerPage

## page

## 과제 3단계

## 🎸

### 과제 수행 일지

### 궁금한 점
