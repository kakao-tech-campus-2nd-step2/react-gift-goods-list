# React Gift Goods List

## 개요

이 저장소는 FE 카카오 선물하기 3주차 과제 (2024-07-08 ~ 2024-07-12)를 위한 React 페이지 구현을 포함하고 있습니다. 학습 일지는 [여기](https://www.notion.so/TIL-FE-25dbeb894e884b889eca0fa3e4e13904)에서 확인할 수 있습니다.

---

## 상품 리스트 구현 - API

### 1단계 - API 적용하기

#### 요구사항

- **비동기 데이터 구현**
  - Axios만 사용한다.
  - React Query를 사용하지 않는다.
- **API 구현**
  - Axios 또는 React Query를 사용한다.
- **fetch state 관리**
  - Suspense를 사용하지 않는다.
  - Error Boundary를 사용하지 않는다.

#### Type 정의

- [x] oas.yaml 파일을 토대로 `Request Type`을 정의한다.
- [x] oas.yaml 파일을 토대로 `Response Type`을 정의한다.

#### API 구현

- **메인 페이지 (@/pages/Home)**
  - **Theme 카테고리 섹션(@/components/features/Home/ThemeCategorySection)**
    - [x] `/api/v1/themes` API를 사용하여 구현한다.
  - **실시간 급상승 선물 랭킹 섹션(@/components/features/Home/RankingSection)**
    - [x] `/api/v1/ranking/products` API를 사용하여 구현한다.
    - [x] 필터 조건을 선택하면 해당 조건에 맞게 API를 요청하여 데이터를 보여준다.

- **Theme 페이지 (@/pages/Theme)**
  - **히어로 섹션 (@/components/features/Theme/HeroSection)**
    - [x] URL의 pathParams를 사용하여 구현한다.
    - [x] `/api/v1/themes` API를 사용하여 구현한다.
    - [x] themeKey가 잘못된 경우 메인 페이지로 리다이렉트한다.
  - **상품 목록 섹션 (@/components/features/Theme/ProductSection)**
    - [x] `/api/v1/themes/{themeKey}/products` API를 사용하여 구현한다.
    - [x] API 요청 시 한 번에 20개의 상품 목록을 가져온다.

---

### 2단계 - `Loading`, `Error` 상태 핸들링 하기

- [x] API `Loading` 상태 UI 대응
- [x] 데이터 없음 상태 UI 대응
- [x] HTTP 상태에 따른 `Error` 처리
  - [x] 200 - OK
  - [x] 201 - Created
  - [x] 302 - Found(HTTP 1.0)
  - [x] 304 - Not Modified
  - [x] 401 - Unauthorized
  - [x] 404 - Not Found
  - [x] 500 - Internal Server Error
  - [x] 503 - Service Unavailable

---

### 3단계 - 테마 별 선물 추천 API에 페이지네이션 구현하기 & React Query 사용해보기

1. **IntersectionObserver를 사용한 무한 스크롤 구현**
   - [x] IntersectionObserver를 활용하여 페이지 스크롤 위치를 감지한다.
   - [x] 스크롤이 일정 위치에 도달하면 추가 데이터를 요청하여 화면에 추가한다.

2. **Axios를 사용한 API 호출을 react-query로 대체**
   - [x] Axios로 구현된 API 호출을 react-query를 사용하여 대체한다.

---

### 4단계 - 질문의 답변을 README에 작성

1. **CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.**

   CORS (Cross-Origin Resource Sharing) 에러는 브라우저에서 다른 출처의 리소스를 요청할 때 보안 정책에 의해 발생하는 에러입니다. 이는 보안상의 이유로 동일 출처 정책(Same-Origin Policy)에 의해 제약됩니다. 이를 해결하기 위해 서버에서 CORS 헤더를 설정하거나, 프록시 서버를 사용하여 동일 출처로 요청을 보내도록 할 수 있습니다.

2. **비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.**

   - **Callback**
     - 장점: 간단하고 빠르게 구현 가능.
     - 단점: 콜백 지옥(Callback Hell)이라 불리는 가독성 문제 발생 가능.

   - **Promise**
     - 장점: 콜백에 비해 가독성이 좋고, 에러 처리가 용이함.
     - 단점: 여러 Promise를 중첩하여 사용할 경우 코드가 복잡해질 수 있음.

   - **Async/Await**
     - 장점: 비동기 코드를 동기 코드처럼 작성할 수 있어 가독성이 높음.
     - 단점: 예외 처리를 위해 try/catch 구문을 사용해야 함.

3. **React Query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.**

   - **React Query의 주요 특징**
     - 서버 상태를 관리하기 위한 라이브러리로, 데이터 패칭, 캐싱, 동기화, 업데이트를 손쉽게 처리.
     - 비동기 요청의 상태를 쉽게 관리할 수 있도록 도와줌.
     - 다양한 캐싱 전략과 자동 리패칭 기능 제공.

   - **queryKey의 역할**
     - 각 쿼리를 고유하게 식별하는 키로, 캐싱과 리패칭에 사용됨.
     - 동일한 queryKey를 가진 쿼리는 같은 데이터를 공유하며, 이를 통해 데이터 일관성을 유지할 수 있음.