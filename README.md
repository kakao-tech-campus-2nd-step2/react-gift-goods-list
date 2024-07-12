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

### 1단계

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
- [x] themePage-header: `/api/v1/themes`
- [x] themePage-상품목록: `/api/v1/themes/{themeKey}/products`
  - path params: themeKey
  - query params
    - pageToken: 목록 불러오기에 사용할 페이지 토큰
    - maxResults
  - res
    - products: ProdectDtat array
    - nextPageToken
    - pageInfo: totalResults, resultsPerPage

### 2단계

- 각 API에서 Loading에 대한 UI 대응하기
- 데이터가 없는 경우 UI 대응
- Http Status에 따라 Error 처리

---

- [x] Loading 컴포넌트 추가
- [x] isLoading 결과에 따라 Loading 컴포넌트 랜더링
- [x] useGetAPI 함수 리턴값에 에러 상태 추가
- [x] 에러 처리

### 3단계

- [x]  프로젝트에 React Query 추가
- [x]  (pages/Theme/index) React Query 적용
- [ ]  (pages/Theme/index)페이지네이션 구현

## page

## 과제 4단계

- [ ]  질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.
- [ ]  질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.
- [ ]  질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

## 🎸

### 과제 수행 일지

- [1단계 구현](https://www.notion.so/Day-12-3431b41b37c9495f9a38e716b76dbc3c?pvs=4#60529c9431f742cca9f32f0abfb023a9)
- [2단계 구현](https://www.notion.so/Day-13-3979aa2c2f24497fa46b8e4058ced32a?pvs=4#07345ce4a17e4f518b9341995aa40bc2)

### 궁금한 점
