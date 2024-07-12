## **경북대 FE\_정솔빈\_2주차 과제**

### Week 3. 1단계 - API 적용하기

**할 일 목록:**

- [x] Request, Response Type 정의, API 구현
- [x] 메인 페이지 - Theme 카테고리 섹션
  - [x] /api/v1/themes API를 사용하여 section을 구현
- [x] 메인 페이지 - 실시간 급상승 선물 랭킹 섹션
  - [x] /api/v1/ranking/products API를 사용하여 section 구현
  - [x] 필터 조건을 선택하면 해당 조건에 맞게 API를 요청해서 보이도록 구현
- [x] Theme 페이지 - header
  - [x] url의 pathParams와 /api/v1/themes API를 사용하여 section을 구현
  - [x] themeKey가 잘못된 경우 메인 페이지로 연결
- [x] Theme 페이지 - 상품 목록 섹션
  - [x] /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록 구현
  - [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 구현

### Week 3. 2단계 - Error, Loading Status 핸들링 하기

**할 일 목록:**

- [x] 각 API에서 Loading 상태에 대한 UI 대응
- [x] 데이터가 없는 경우에 대한 UI 대응
- [x] Http Status에 따라 Error를 다르게 처리

### Week 3. 3단계 - 테마 별 선물 추천 API에 페이지네이션 구현하기 & React Query 사용해보기

- [x] 스크롤 내리면 추가로 데이터를 요청하여 보여지도록 구현하기
- [ ] 1단계에서 구현한 API를 react-query를 사용해서 구현하기

---

### 코드 작성하면서 어려웠던 점

### 마무리 및 질문

**1. Unexpected Application Error**
홈 화면에서 처음 각 테마 중 하나를 눌러서 테마 페이지로 이동하면 Unexpected Application Error가 발생합니다. 다시 이전 화면으로 돌아가서 테마를 누르면 정상적으로 코드가 작동됩니다.

시도1. 오류 페이지에서 동기 입력에 응답하면서 컴포넌트가 중단되었고, startTrannsition을 사용하여 중단을 최소화할 수 있다고 해서 startTransition을 이용했지만 똑같은 오류가 발생합니다.
