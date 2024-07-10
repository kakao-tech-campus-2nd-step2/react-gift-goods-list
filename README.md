<h1> 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편 </h1>

<h3>1️⃣ Step 1 체크리스트</h3>

- `oas.yaml` 파일과 `mock API URL` 을 사용해서 API 구현하기

- Main Page → 

  - [x] Theme 카테고리 섹션: `/api/v1/themes` API를 사용하여 Section 구현

  - [x] 실시간 급상승 선물랭킹 섹션: `api/v1/ranking/products` API를 사용하여 Section 구현
 
- Theme Page → 

  - [x] Header : url의 pathParams와 `/api/v1/themes` API를 사용하여 Section을 구현

  - [ ] 상품 목록 섹션 : `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현. API 요청 시 한번에 <b>20개의 상품 목록</b>이 내려오도록 한다.

<br>

<h3>2️⃣ Step 2 체크리스트</h3>

- [ ] 각 API에서 Loading 상태에 대한 UI 대응

- [ ] 데이터가 없는 경우에 대한 UI 대응

- [ ] HTTP Status에 따라 Error를 다르게 처리

<br>

<h3>3️⃣ Step 3 체크리스트</h3>

- [ ] 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 함

- [ ] 1단계에서 구현한 API를 `react-query` 를 사용해서 구현