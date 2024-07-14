## Week3. STEP1 - API 적용하기

### ✨How to start

```
npm install
cd react-gift-goods-list
npm run start
```

### 📜Requirements

- [x] 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의

- [x] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현
  - 메인 페이지 - Theme 카테고리 섹션
  - [x] `/api/v1/themes` API를 사용하여 Section 구현
  - 메인 페이지 - 실시간 급상승 선물랭킹 섹션
  - [x] `/api/v1/ranking/products` API를 사용하여 Section 구현
  - [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 함.
  - Theme 페이지 - header
  - [x] url의 pathParams와 `/api/v1/themes` API를 사용하여 Section 구현
  - [x] `themeKey`가 잘못 된 경우 메인 페이지로 연결
  - Theme 페이지 - 상품 목록 섹션
  - [x] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록 구현
  - [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 함

## Week3. STEP2 - Error, Loading Status 핸들링 하기

### 📜Requirements

- [x] 각 API에서 Loading 상태에 대한 UI 대응을 함.
- [x] 데이터가 없는 경우에 대한 UI 대응을 함.
- [x] Http Status에 따라 Error를 다르게 처리함.

## Week3. STEP3 - 테마 별 선물 추천 API에 페이지네이션 구현하기

### 📜Requirements

- [x] React Query를 사용하여 API 구현
- [x] Suspense, Error Boundary를 사용하여 에러, 로딩 상태 핸들링을 함.
- [x] 페이지네이션과 무한스크롤 구현
