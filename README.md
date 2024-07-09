## Week3. STEP1 - API 적용하기

### ✨How to start

```
npm install
cd react-gift-goods-list
npm run start
```

### 📜Requirements

- [ ] 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의

- [ ] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현
  - 메인 페이지 - Theme 카테고리 섹션
  - [x] `/api/v1/themes` API를 사용하여 Section 구현
  - 메인 페이지 - 실시간 급상승 선물랭킹 섹션
  - [ ] `/api/v1/ranking/` products API를 사용하여 Section 구현
  - [ ] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 함.
  - Theme 페이지 - header
  - [ ] url의 pathParams와 `/api/v1/themes API`를 사용하여 Section 구현
  - [ ] `themeKey`가 잘못 된 경우 메인 페이지로 연결
  - Theme 페이지 - 상품 목록 섹션
  - [ ] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록 구현
  - [ ] API 요청 시 한번에 20개의 상품 목록이 내려오도록 함.
