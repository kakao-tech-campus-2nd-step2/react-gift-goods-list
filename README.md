# react-gift-goods-list

FE 카카오 선물하기 3주차 과제: API

## step1

- [x] 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의해요.
- [ ] React Query를 사용하지 말고 axios 를 사용해서 구현해요.
- [ ] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현해요.
  - 메인 페이지 - Theme 카테고리 섹션
  - [ ] /api/v1/themes API를 사용하여 Section을 구현해요.
  - 메인 페이지 - 실시간 급상승 선물랭킹 섹션
  - [ ] /api/v1/ranking/products API를 사용하여 Section을 구현해요. (Axios 사용 가능)
  - [ ] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해요.
  - Theme 페이지 - header
  - [ ] url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현해요.
  - [ ] themeKey가 잘못 된 경우 메인 페이지로 연결해요.
  - Theme 페이지 - 상품 목록 섹션
  - [ ] /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현해요.
  - [ ] API 요청 시 한번에 20개의 상품 목록이 내려오도록 해요.

## step2

- [ ] 각 API에서 Loading 상태에 대한 UI 대응을 해요.
- [ ] 데이터가 없는 경우에 대한 UI 대응을 해요.
- [ ] Http Status에 따라 Error를 다르게 처리해요.

## step3

- [ ] 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 해요.
- [ ] 1단계에서 구현한 API를 react-query를 사용해서 구현해봐요.

## 선택

- [ ] Suspense와 ErrorBoundary를 사용하여 선언적인 Data Fetch 방식으로 설계해요.

## step4

### 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

### 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

### 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.
